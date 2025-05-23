using System;
using System.Collections.Generic;
using greenshopApp.Persistence.Interfaces;

namespace greenshopApp.Persistence.Models
{
    public class OrderEntity: IEntity
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public DateTime DeliveryDate { get; set; } = DateTime.Now.AddDays(3);

        public UserEntity Customer { get; set; }
        public Guid CustomerID { get; set; }

        public List<PlantEntity> Plants { get; set; } = [];
    }
}
