using System;

namespace greenshopApp.Persistence.Models
{
    public class PlantEntity
    {
        //Обязательные поля
        public Guid Id { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } = decimal.Zero;
        public int Size { get; set; } = 0;
        
        //Необязательные поля
        public string Description { get; set; } = string.Empty;
        public string PictureFileName { get; set; } = string.Empty;
        public int RemainingCount { get; set; } = 0;

        public float Rate { get; set; } = 0;
        public List<OrderEntity> Orders { get; set; } = [];
    }
}
