using greenshopApp.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using greenshopApp.Endpoints;
using greenshopApp.Application.RepositoryServices;
using greenshopApp.Application.Interfaces.Auth;
using greenshopApp.Persistence.Models;
using greenshopApp.Persistence.Repositories;
using greenshopApp.Infrastructure;
using Microsoft.AspNetCore.Http.Features;
using Swashbuckle.AspNetCore.SwaggerGen;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Настройка Kestrel
builder.WebHost.ConfigureKestrel(serverOptions => {
    serverOptions.Limits.MaxRequestBodySize = null;
    serverOptions.AllowSynchronousIO = true;
});

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 104857600; // Увеличиваем лимит до 100 МБ
});

// Включите все возможные CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Укажите клиентский адрес
              .AllowAnyMethod()                    // Разрешите все HTTP-методы
              .AllowAnyHeader();                    // Разрешите любые заголовки
    });
});

// Добавление сервисов Swagger
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Greenshop API", Version = "v1" });
//});

builder.Services.AddSwaggerGen(c =>
{
c.SwaggerDoc("v1", new OpenApiInfo { Title = "Greenshop API", Version = "v1" });

// Добавляем схему для загрузки файлов
c.OperationFilter<AddFileUploadOperationFilter>();
});




builder.Services.Configure<JwtOptions>(configuration.GetSection("JwtOptions"));
// Регистрация репозиториев и сервисов
builder.Services.AddScoped<GenericRepository<UserEntity>>();
builder.Services.AddScoped<GenericRepository<OrderEntity>>();
builder.Services.AddScoped<GenericRepository<PlantEntity>>();
builder.Services.AddScoped<UserRepositoryService>();
builder.Services.AddScoped<OrderRepositoryService>();
builder.Services.AddScoped<PlantRepositoryService>();
// Добавьте регистрацию для IPasswordHasher и IJwtProvider
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>(); 
builder.Services.AddScoped<IJwtProvider, JwtProvider>(); 

builder.Services.AddDbContext<GreenshopDbContext>(
    options =>
    {
        options.UseNpgsql(configuration.GetConnectionString(nameof(GreenshopDbContext)));
    });



var app = builder.Build();

app.UseCors("AllowFrontend");

// Включение middleware Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Greenshop API V1");
    });
}

app.UseStaticFiles(); // Разрешает доступ к файлам в wwwroot

var webRootPath = builder.Environment.WebRootPath;
if (string.IsNullOrEmpty(webRootPath))
{
    webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
    Directory.CreateDirectory(webRootPath);
    builder.Environment.WebRootPath = webRootPath;
}


app.MapGet("/", () => "API is running. Use /swagger for documentation");
app.MapUsersEndpoints();
app.MapPlantsEndpoints();
app.MapOrdersEndpoints();   
app.Run();


public class AddFileUploadOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var formFileParameters = context.MethodInfo.GetParameters()
            .Where(p => p.ParameterType == typeof(List<IFormFile>))
            .ToList();

        foreach (var parameter in formFileParameters)
        {
            operation.RequestBody = new OpenApiRequestBody
            {
                Content = new Dictionary<string, OpenApiMediaType>
                {
                    ["multipart/form-data"] = new OpenApiMediaType
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = "object",
                            Properties =
                            {
                                [parameter.Name] = new OpenApiSchema
                                {
                                    Type = "array",
                                    Items = new OpenApiSchema
                                    {
                                        Type = "string",
                                        Format = "binary"
                                    }
                                }
                            },
                            Required = new HashSet<string> { parameter.Name }
                        }
                    }
                }
            };
        }
    }
}