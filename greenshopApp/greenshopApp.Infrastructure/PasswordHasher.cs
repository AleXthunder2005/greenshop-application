using greenshopApp.Application.Interfaces.Auth;

namespace greenshopApp.Infrastructure
{
    public class PasswordHasher : IPasswordHasher
    {
        public string Generate(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password);
        }

        public bool Verify(string password, string hashedPassword)
        {
             return BCrypt.Net.BCrypt.EnhancedVerify(password, hashedPassword);
        }
    }
}
