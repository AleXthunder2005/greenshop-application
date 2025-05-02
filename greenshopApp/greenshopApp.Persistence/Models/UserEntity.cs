using System;
namespace greenshopApp.Persistence.Models
{
    public class UserEntity
    {
        public Guid Id { get; set; } 
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string CardNumber {  get; set; } = string.Empty;
        public List<OrderEntity> Orders { get; set; } = [];
    }
}
