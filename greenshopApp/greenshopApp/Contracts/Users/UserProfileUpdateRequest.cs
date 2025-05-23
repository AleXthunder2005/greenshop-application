namespace greenshopApp.Contracts.Users
{
    public class UserProfileUpdateRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string StreetAddress { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
    }
}
