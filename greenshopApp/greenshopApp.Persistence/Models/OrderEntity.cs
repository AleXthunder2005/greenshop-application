using System;
using System.Collections.Generic;
using greenshopApp.Persistence.Interfaces;

namespace greenshopApp.Persistence.Models
{
    public class OrderEntity: IEntity
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
