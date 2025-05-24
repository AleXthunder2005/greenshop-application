namespace greenshopApp.Contracts.Orders
{
    public class AddOrderSimpleResponse
    {
        public Guid Id { get; set; }
        public DateTime DeliveryDate { get; set; }
    }
}
