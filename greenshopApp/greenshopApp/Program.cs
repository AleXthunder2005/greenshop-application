using greenshopApp.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore.Design;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Добавление сервисов Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Greenshop API", Version = "v1" });
});

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

app.UseHttpsRedirection();

app.MapGet("/", () => "API is running. Use /swagger for documentation");
app.Run();