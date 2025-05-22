using greenshopApp.Persistence.Interfaces;

namespace greenshopApp.Persistence.Models
{
    public class BillingInfoEntity : IEntity
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Sity { get; set; } = string.Empty;
        public string StreetAddress { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; } = string.Empty;
        public UserEntity User { get; set; }
        public Guid UserID { get; set; }
    }
}
