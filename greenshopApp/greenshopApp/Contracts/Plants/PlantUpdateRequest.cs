namespace greenshopApp.Contracts.Plants
{
    public class PlantUpdateRequest
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } = decimal.Zero;
        public int? Sale { get; set; }
        public string Category { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
    }
}
