namespace greenshopApp.Contracts.Plants
{
    public record PlantImagesResponse(List<string> ImageUrls, string? Errors = null);
}
