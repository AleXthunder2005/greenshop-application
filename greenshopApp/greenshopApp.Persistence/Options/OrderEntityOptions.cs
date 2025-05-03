using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using greenshopApp.Persistence.Models;

namespace greenshopApp.Persistence.Options
{
    public class OrderEntityOptions
    {
        public string? DeliveryAdress { get; set; } = null;
        public DateTime? OrderDate { get; set; } = null;
        public DateTime? DeliveryDate { get; set; } = null;
    }
}
