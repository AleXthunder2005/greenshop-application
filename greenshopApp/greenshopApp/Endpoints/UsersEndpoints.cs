using greenshopApp.Application.RepositoryServices;
using greenshopApp.Contracts.Users;
using static greenshopApp.Application.StatusCodes.UserStatusCodes;

namespace greenshopApp.Endpoints
{
    public static class UsersEndpoints
    {
        public static IEndpointRouteBuilder MapUsersEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("users");

            group.MapPost("/register", Register);
            group.MapPost("/login", Login);
            group.MapGet("/{id:guid}", GetUser);
            group.MapPut("/{id:guid}/profile", UpdateProfile);

            return app;
        }

        private static async Task<IResult> Login (
                UserRepositoryService userService,
                UserLoginRequest request
            )
        {
            var (status, userId) = await userService.LoginAsync(
                request.Email,
                request.Password);

            return status switch
            {
                USER_STATUS_CODES.SUCCESSFUL_LOGIN => Results.Ok(new UserLoginResponse { UserId = userId, IsAdmin = false }),
                USER_STATUS_CODES.INVALID_CREDENTIALS => Results.Unauthorized(),
                USER_STATUS_CODES.IS_ADMIN => Results.Ok(new UserLoginResponse { UserId = userId, IsAdmin = true }),
                _ => Results.StatusCode(StatusCodes.Status500InternalServerError)
            };
        }

        // Регистрация (только основные данные)
        private static async Task<IResult> Register(
            UserRepositoryService userService,
            UserRegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return Results.BadRequest("UserName, Email and Password are required");
            }

            var status = await userService.RegisterAsync(
                request.UserName,
                request.Email,
                request.Password);

            return status switch
            {
                USER_STATUS_CODES.SUCCESSFUL_REGISTRATION => Results.Ok(new UserRegisterResponse { UserId = (await userService.GetByEmailAsync(request.Email))?.Id}),
                USER_STATUS_CODES.EMAIL_IS_BUSY => Results.Conflict("Email is already in use"),
                _ => Results.StatusCode(StatusCodes.Status500InternalServerError)
            };
        }

        // Обновление профиля (дополнительные данные)
        private static async Task<IResult> UpdateProfile(
            UserRepositoryService userService,
            Guid id,
            UserProfileUpdateRequest request)
        {
            var user = await userService.GetByIdAsync(id);
            if (user == null)
                return Results.NotFound();

            // Обновляем только разрешенные поля
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Country = request.Country;
            user.City = request.City;
            user.StreetAddress = request.StreetAddress;
            user.PhoneNumber = request.PhoneNumber;

            bool success;
            try
            {
                await userService.UpdateUserAsync(user);
                success = true;
            }
            catch
            {
                success = false;
            }

            return success
                ? Results.Ok()
                : Results.Problem("Failed to update profile");
        }

        // Получение данных пользователя
        private static async Task<IResult> GetUser(
            UserRepositoryService userService,
            Guid id)
        {
            var user = await userService.GetByIdAsync(id);
            if (user == null)
                return Results.NotFound();

            var response = new UserResponse
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Country = user.Country,
                City = user.City,
                StreetAddress = user.StreetAddress,
                PhoneNumber = user.PhoneNumber
            };

            return Results.Ok(response);
        }

    }
}
