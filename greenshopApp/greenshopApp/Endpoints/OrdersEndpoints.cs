using greenshopApp.Application.RepositoryServices;
using greenshopApp.Contracts.Orders;
using greenshopApp.Persistence.Models;

namespace greenshopApp.Endpoints
{
    public static class OrdersEndpoints
    {
        public static IEndpointRouteBuilder MapOrdersEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("orders");

            group.MapGet("/", GetOrdersAsync);
            group.MapGet("/user/{userId:guid}", GetOrdersByUserId);
            group.MapPost("/", AddOrder);

            return app;
        }

        private static async Task<IResult> GetOrdersAsync(
            OrderRepositoryService orderService)
        {
            var orders = await orderService.GetAsync();

            if (orders is null || !orders.Any())
                return Results.NoContent();

            var response = orders.Select(MapToOrderResponse);
            return Results.Ok(response);
        }

        private static async Task<IResult> GetOrdersByUserId(
            OrderRepositoryService orderService,
            Guid userId)
        {
            var orders = await orderService.GetByCustomerAsync(userId);

            if (orders is null || !orders.Any())
                return Results.NoContent();

            var response = orders.Select(MapToOrderResponse);
            return Results.Ok(response);
        }



        private static async Task<IResult> AddOrder(
            OrderRepositoryService orderService,
            PlantRepositoryService plantService,
            UserRepositoryService userService,
            OrderAddRequest request)
        {
            // Валидация запроса
            if (request is null)
                return Results.BadRequest("Request cannot be null");

            if (request.Plants is null || !request.Plants.Any())
                return Results.BadRequest("Order must contain at least one plant");

            // Проверка существования пользователя
            var user = await userService.GetByIdAsync(request.UserId);
            if (user is null)
                return Results.NotFound($"User with id {request.UserId} not found");

            // Создание заказа
            var order = new OrderEntity
            {
                Id = Guid.NewGuid(),
                OrderDate = DateTime.UtcNow,
                DeliveryDate = DateTime.UtcNow.AddDays(3),
                CustomerID = request.UserId,
                Customer = user,
                Plants = new List<PlantEntity>()
            };

            // Добавление растений в заказ с учетом количества
            foreach (var plantItem in request.Plants)
            {
                var plant = await plantService.GetByIdAsync(plantItem.PlantId);
                if (plant is null)
                    return Results.NotFound($"Plant with id {plantItem.PlantId} not found");

                // Проверка допустимого количества
                if (plantItem.Quantity <= 0)
                    return Results.BadRequest($"Quantity for plant {plantItem.PlantId} must be greater than 0");

                // Добавляем растение указанное количество раз
                for (int i = 0; i < plantItem.Quantity; i++)
                {
                    order.Plants.Add(plant);
                }
            }

            try
            {
                await orderService.AddAsync(order);
                var response = MapToOrderResponse(order);
                return Results.Created($"/orders/{order.Id}", response);
            }
            catch (Exception ex)
            {
                return Results.Problem(
                    detail: ex.Message,
                    statusCode: StatusCodes.Status500InternalServerError);
            }
        }

        private static OrderResponse MapToOrderResponse(OrderEntity order)
        {
            // Группировка растений по ID для подсчета количества
            var plantGroups = order.Plants
                .GroupBy(p => p.Id)
                .Select(g => new PlantInOrderResponse
                {
                    Id = g.Key,
                    Name = g.First().Name,
                    Price = g.First().Price,
                    Sale = g.First().Sale,
                    Size = g.First().Size,
                    Quantity = g.Count()
                })
                .ToList();

            return new OrderResponse
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                DeliveryDate = order.DeliveryDate,
                Plants = plantGroups,
                User = new UserInOrderResponse
                {
                    Id = order.Customer.Id,
                    FirstName = order.Customer.FirstName,
                    LastName = order.Customer.LastName,
                    Username = order.Customer.UserName,
                    Countryry = order.Customer.Country,
                    City = order.Customer.City,
                    StreetAddress = order.Customer.StreetAddress,
                    Email = order.Customer.Email,
                    Phone = order.Customer.PhoneNumber
                }
            };
        }
    }
}