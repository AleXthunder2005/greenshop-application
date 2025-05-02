using System;
using System.Collections.Generic;

namespace greenshopApp.Persistence.Models
{
    public class OrderEntity
    {
        public Guid Id { get; set; }
        public string DeliveryAdress { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }

        public UserEntity? Customer { get; set; }
        public Guid CustomerID { get; set; }

        public List<PlantEntity> Plants { get; set; } = [];
    }
}
