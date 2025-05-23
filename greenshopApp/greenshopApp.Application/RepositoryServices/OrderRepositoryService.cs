using greenshopApp.Persistence;
using greenshopApp.Persistence.Models;
using greenshopApp.Persistence.Options;
using greenshopApp.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace greenshopApp.Application.RepositoryServices
{
    public class OrderRepositoryService
    {
        private readonly GenericRepository<OrderEntity> _repository;
        private readonly GreenshopDbContext _dbContext;

        public OrderRepositoryService(
            GenericRepository<OrderEntity> repository,
            GreenshopDbContext dbContext)
        {
            _repository = repository;
            _dbContext = dbContext;
        }

        public async Task<List<OrderEntity>> GetAsync()
        {
            return await _repository.GetQueryable()
                .Include(o => o.Customer)
                .Include(o => o.Plants)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<List<OrderEntity>> GetByCustomerAsync(Guid customerId)
        {
            return await _repository.GetQueryable()
                .Include(o => o.Plants)
                .Where(o => o.CustomerID == customerId)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task AddAsync(OrderEntity order)
        {
            // 1. Прикрепляем пользователя к контексту
            if (_dbContext.Entry(order.Customer).State == EntityState.Detached)
            {
                _dbContext.Users.Attach(order.Customer);
            }

            // 2. Прикрепляем растения к контексту
            foreach (var plant in order.Plants)
            {
                if (_dbContext.Entry(plant).State == EntityState.Detached)
                {
                    _dbContext.Plants.Attach(plant);
                }
            }

            // 3. Сохраняем заказ
            await _repository.AddAsync(order);
        }

        //private async Task ProcessOrderRelations(OrderEntity order)
        //{
        //    // Убедимся, что пользователь отслеживается контекстом
        //    if (_dbContext.Entry(order.Customer).State == EntityState.Detached)
        //    {
        //        var existingUser = await _dbContext.Users.FindAsync(order.CustomerID);
        //        if (existingUser != null)
        //        {
        //            _dbContext.Entry(existingUser).State = EntityState.Unchanged;
        //            order.Customer = existingUser;
        //        }
        //    }

        //    // Обрабатываем растения
        //    for (int i = 0; i < order.Plants.Count; i++)
        //    {
        //        var plant = order.Plants[i];
        //        if (_dbContext.Entry(plant).State == EntityState.Detached)
        //        {
        //            var existingPlant = await _dbContext.Plants.FindAsync(plant.Id);
        //            if (existingPlant != null)
        //            {
        //                order.Plants[i] = existingPlant;
        //            }
        //        }
        //    }
        //}
















        //public async Task<List<OrderEntity>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        //{
        //    return await _repository.GetQueryable()
        //        .AsNoTracking()
        //        .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
        //        .ToListAsync();
        //}

        //public async Task<List<OrderEntity>> GetByPageAsync(int page, int pageSize)
        //{
        //    return await _repository.GetQueryable()
        //        .AsNoTracking()
        //        .OrderByDescending(o => o.OrderDate)
        //        .Skip((page - 1) * pageSize)
        //        .Take(pageSize)
        //        .ToListAsync();
        //}

        //// Update services
        //public async Task UpdateFieldsAsync(Guid id, OrderEntityOptions options)
        //{
        //    var orderEntity = await _repository.GetByIdAsync(id);
        //    var entityType = typeof(OrderEntity);

        //    foreach (var optionProperty in typeof(OrderEntityOptions).GetProperties())
        //    {
        //        var value = optionProperty.GetValue(options);
        //        if (value == null) continue;

        //        var entityProperty = entityType.GetProperty(optionProperty.Name);
        //        if (entityProperty != null && entityProperty.CanWrite)
        //        {
        //            entityProperty.SetValue(orderEntity, value);
        //        }
        //    }

        //    await _repository.UpdateAsync(orderEntity);
        //}

        //public async Task UpdateDeliveryAddressAsync(Guid id, string newAddress)
        //{
        //    var orderEntity = await _repository.GetByIdAsync(id);
        //    orderEntity.DeliveryAdress = newAddress;
        //    await _repository.UpdateAsync(orderEntity);
        //}

        //public async Task UpdateDeliveryDateAsync(Guid id, DateTime newDeliveryDate)
        //{
        //    var orderEntity = await _repository.GetByIdAsync(id);
        //    orderEntity.DeliveryDate = newDeliveryDate;
        //    await _repository.UpdateAsync(orderEntity);
        //}

        //public async Task MarkAsDeliveredAsync(Guid id)
        //{
        //    var orderEntity = await _repository.GetByIdAsync(id);
        //    orderEntity.DeliveryDate = DateTime.UtcNow;
        //    await _repository.UpdateAsync(orderEntity);
        //}
    }
}
