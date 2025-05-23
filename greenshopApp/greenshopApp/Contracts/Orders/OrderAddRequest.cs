namespace greenshopApp.Contracts.Orders
{
    public class OrderAddRequest
    {
        public Guid UserId { get; set; }
        public List<OrderPlantItem> Plants { get; set; } = new();
    }

    public class OrderPlantItem
    {
        public Guid PlantId { get; set; }
        public int Quantity { get; set; } = 1;
    }
}
