namespace greenshopApp.Contracts.Orders;

public class OrderResponse
{
    public Guid Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateTime DeliveryDate { get; set; }
    public List<PlantInOrderResponse> Plants { get; set; } = new();
    public UserInOrderResponse User { get; set; } = new();
}

public class PlantInOrderResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? Sale { get; set; }
    public string Size { get; set; } = string.Empty;
    public int Quantity { get; set; }
}

public class UserInOrderResponse
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Countryry { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string StreetAddress { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; } = string.Empty;

}