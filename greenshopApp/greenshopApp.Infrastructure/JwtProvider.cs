using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Unicode;
using greenshopApp.Application.Interfaces.Auth;
using greenshopApp.Persistence.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace greenshopApp.Infrastructure
{
    public class JwtProvider : IJwtProvider
    {
        private readonly JwtOptions _options;

        public JwtProvider(IOptions<JwtOptions> options)
        {
            _options = options.Value;
        }


        public string GenerateToken (UserEntity user)
        {
            Claim[] claims = [new("userId", user.Id.ToString())];

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey));
            SigningCredentials signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken token = new JwtSecurityToken(
                signingCredentials: signingCredentials,
                claims: claims
            );

            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }
    }
}
