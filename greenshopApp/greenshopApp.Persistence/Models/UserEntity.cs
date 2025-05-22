using System;
using greenshopApp.Persistence.Interfaces;
namespace greenshopApp.Persistence.Models
{
    public class UserEntity : IEntity
    {
        private UserEntity(Guid id, string userName, string email, string passwordHash) 
        {
            Id = id;
            UserName = userName;
            Email = email;
            PasswordHash = passwordHash;
        }

        public Guid Id { get; set; } 
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Sity { get; set; } = string.Empty;
        public string StreetAddress { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; } = string.Empty;
        public List<OrderEntity> Orders { get; set; } = [];

        public static UserEntity Create(string userName, string email, string passwordHash)
        {
            return new UserEntity(Guid.NewGuid(), userName, email, passwordHash);
        }
    }
}
