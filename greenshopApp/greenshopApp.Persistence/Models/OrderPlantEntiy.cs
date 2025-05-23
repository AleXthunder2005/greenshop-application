using greenshopApp.Persistence.Interfaces;

namespace greenshopApp.Persistence.Models
{

    public class OrderPlantEntity
    {
        public Guid OrderId { get; set; }
        public OrderEntity Order { get; set; }

        public Guid PlantId { get; set; }
        public PlantEntity Plant { get; set; }

        public int Quantity { get; set; }
    }
}