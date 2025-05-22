using greenshopApp.Persistence.Models;

namespace greenshopApp.Application.Interfaces.Auth
{
    public interface IJwtProvider
    {
        public string GenerateToken(UserEntity user);
    }
}
