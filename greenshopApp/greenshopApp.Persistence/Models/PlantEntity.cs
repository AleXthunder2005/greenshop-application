using System;
using System.Collections.Generic;
using greenshopApp.Persistence.Interfaces;

namespace greenshopApp.Persistence.Models
{
    public class PlantEntity : IEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } = decimal.Zero;
        public int? Sale { get; set; }
        public string Category { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;

        // Новый список для связи "Растение-Количество"
        public List<OrderPlantEntity> OrderPlants { get; set; } = new();
    }
}