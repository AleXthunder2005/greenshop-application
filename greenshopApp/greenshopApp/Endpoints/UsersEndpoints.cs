using greenshopApp.Application.RepositoryServices;
using greenshopApp.Contracts.Users;
using static greenshopApp.Application.StatusCodes.UserStatusCodes;

namespace greenshopApp.Endpoints
{
    public static class UsersEndpoints
    {
        public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapPost("register", Register);
            app.MapPost("login", Login);

            return app;
        }

        private static async Task<IResult> Register(
            UserRepositoryService userService,
            UserRegisterRequest request)
        {
            var status = await userService.RegisterAsync(
                request.UserName,
                request.Email,
                request.Password);

            return status switch
            {
                USER_STATUS_CODES.SUCCESSFUL_REGISTRATION => Results.Ok(new { Message = "Registration successful" }),
                USER_STATUS_CODES.EMAIL_IS_BUSY => Results.Conflict(new { Error = "Email is already in use" }),
                _ => Results.StatusCode(StatusCodes.Status500InternalServerError)
            };
        }

        private static async Task<IResult> Login(
            UserRepositoryService userService,
            UserLoginRequest request)
        {
            Console.WriteLine($"Received login request for {request.Email}");

            var (status, token) = await userService.LoginAsync(
                request.Email,
                request.Password);

            return status switch
            {
                USER_STATUS_CODES.SUCCESSFUL_LOGIN => Results.Ok(new { Token = token }),
                USER_STATUS_CODES.INVALID_CREDENTIALS => Results.Unauthorized(),
                USER_STATUS_CODES.IS_ADMIN => Results.Ok(new { Token = token, IsAdmin = true }),
                _ => Results.StatusCode(StatusCodes.Status500InternalServerError)
            };
        }
    }
}
