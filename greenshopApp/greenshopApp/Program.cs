using greenshopApp.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using greenshopApp.Endpoints;
using greenshopApp.Application.RepositoryServices;
using greenshopApp.Application.Interfaces.Auth;
using greenshopApp.Persistence.Models;
using greenshopApp.Persistence.Repositories;
using greenshopApp.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Настройка Kestrel
builder.WebHost.ConfigureKestrel(serverOptions => {
    serverOptions.Limits.MaxRequestBodySize = null;
    serverOptions.AllowSynchronousIO = true;
});

// Включите все возможные CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", builder => {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Добавление сервисов Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Greenshop API", Version = "v1" });
});


builder.Services.Configure<JwtOptions>(configuration.GetSection("JwtOptions"));
// Регистрация репозиториев и сервисов
builder.Services.AddScoped<GenericRepository<UserEntity>>();
builder.Services.AddScoped<UserRepositoryService>();
// Добавьте регистрацию для IPasswordHasher и IJwtProvider
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>(); 
builder.Services.AddScoped<IJwtProvider, JwtProvider>(); 

builder.Services.AddDbContext<GreenshopDbContext>(
    options =>
    {
        options.UseNpgsql(configuration.GetConnectionString(nameof(GreenshopDbContext)));
    });

var app = builder.Build();


// Включение middleware Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Greenshop API V1");
    });
}

app.UseCors();

app.UseHttpsRedirection();

app.MapGet("/", () => "API is running. Use /swagger for documentation");
app.MapUserEndpoints();
app.MapPost("test", () => Results.Ok(new { Message = "Test OK" }));
app.Run();