namespace greenshopApp.Contracts.Plants
{
    public class PlantResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal? Sale { get; set; }
        public string Size { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
    }
}
