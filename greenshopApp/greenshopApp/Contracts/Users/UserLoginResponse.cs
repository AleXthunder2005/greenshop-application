namespace greenshopApp.Contracts.Users
{
    public class UserLoginResponse
    {
        public Guid? UserId { get; set; }
        public bool IsAdmin { get; set; }
    }
}
