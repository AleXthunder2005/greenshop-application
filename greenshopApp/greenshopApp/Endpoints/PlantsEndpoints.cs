using greenshopApp.Application.RepositoryServices;
using greenshopApp.Contracts.Plants;
using greenshopApp.Persistence.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace greenshopApp.Endpoints
{
    public static class PlantsEndpoints
    {
        public static IEndpointRouteBuilder MapPlantsEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("plants")
               .DisableAntiforgery();

            group.MapGet("/", GetPlantsAsync);
            group.MapGet("/{id:guid}", GetPlantByID);
            group.MapPost("/", AddPlant);
            group.MapDelete("/{id:guid}", RemovePlant);
            group.MapPut("/{id:guid}", UpdatePlant);

            group.MapPost("/images/{id:guid}", UploadPlantImages);
            //group.MapGet("/{id:guid}/images/{imageName}", GetPlantImages);

            return app;
        }

        private static async Task<IResult> GetPlantsAsync(
            PlantRepositoryService plantService)
        {
            var plants = await plantService.GetAsync();

            if (plants is null || !plants.Any())
                return Results.NoContent();

            var response = plants.Select(p => new PlantResponse
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Sale = p.Sale,
                Size = p.Size,
                Category = p.Category,
                ShortDescription = p.ShortDescription,
            });

            return Results.Ok(response);
        }

        private static async Task<IResult> GetPlantByID(
            PlantRepositoryService plantService,
            Guid id)
        {
            var plant = await plantService.GetByIdAsync(id);

            if (plant is null)
                return Results.NotFound();

            var response = new PlantResponse
            {
                Id = plant.Id,
                Name = plant.Name,
                Price = plant.Price,
                Sale = plant.Sale,
                Size = plant.Size,
                Category = plant.Category,
                ShortDescription = plant.ShortDescription,
            };

            return Results.Ok(response);
        }

        private static async Task<IResult> AddPlant(
            PlantRepositoryService plantService,
            PlantAddRequest request)
        {
            if (request is null) return Results.BadRequest("Request cannot be null");

            var plant = new PlantEntity
            {
                Name = request.Name,
                Price = request.Price,
                Sale = request.Sale,
                Size = request.Size,
                Category = request.Category,
                ShortDescription = request.ShortDescription
            };

            try
            {
                await plantService.AddAsync(plant);
                return Results.Created($"/plants/{plant.Id}", plant);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> RemovePlant(
            PlantRepositoryService plantService,
            Guid id,
            IWebHostEnvironment environment)
        {
            try
            {
                var plant = await plantService.GetByIdAsync(id);
                if (plant is null) return Results.NotFound();

                await plantService.DeleteAsync(id);

                var imagesPath = Path.Combine(environment.WebRootPath, "plants", "images", id.ToString());
                if (Directory.Exists(imagesPath))
                {
                    Directory.Delete(imagesPath, true);
                }

                return Results.NoContent();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> UpdatePlant(
            PlantRepositoryService plantService,
            Guid id,
            PlantUpdateRequest request)
        {
            try
            {
                var existingPlant = await plantService.GetByIdAsync(id);
                if (existingPlant is null) return Results.NotFound();

                existingPlant.Name = request.Name;
                existingPlant.Price = request.Price;
                existingPlant.Sale = request.Sale;
                existingPlant.Size = request.Size;
                existingPlant.Category = request.Category;
                existingPlant.ShortDescription = request.ShortDescription;

                await plantService.UpdateAsync(existingPlant);
                return Results.Ok(existingPlant);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }
        private static async Task<IResult> UploadPlantImages(
            Guid id,
            [FromForm] IFormFileCollection imageFiles,
            IWebHostEnvironment environment)
        {
            if (imageFiles == null || imageFiles.Count == 0)
                return Results.BadRequest();

            var uploadPath = Path.Combine("plants", "images", id.ToString());
            var fullPath = Path.Combine(environment.WebRootPath, uploadPath);

            try
            {
                if (Directory.Exists(fullPath))
                {
                    Directory.Delete(fullPath, true);
                }
                Directory.CreateDirectory(fullPath);

                var uploadedUrls = new List<string>();
                foreach (var file in imageFiles)
                {
                    if (file.Length == 0) continue;

                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(fullPath, fileName);

                    await using var stream = new FileStream(filePath, FileMode.Create);
                    await file.CopyToAsync(stream);

                    uploadedUrls.Add($"/{uploadPath}/{fileName}");
                }

                return Results.Ok(new { imageUrls = uploadedUrls });
            }
            catch
            {
                return Results.StatusCode(500);
            }
        }

        private static IResult GetPlantImages(
            Guid id,
            IWebHostEnvironment environment)
        {
            var plantImagesFolder = Path.Combine(environment.WebRootPath, "images", id.ToString());

            if (!Directory.Exists(plantImagesFolder))
                return Results.Ok(new PlantImagesResponse(new List<string>()));

            var imageFiles = Directory.GetFiles(plantImagesFolder)
                .Select(Path.GetFileName)
                .Select(fileName => $"/plants/{id}/images/{fileName}")
                .ToList();

            return Results.Ok(new PlantImagesResponse(imageFiles));
        }
    }
}
