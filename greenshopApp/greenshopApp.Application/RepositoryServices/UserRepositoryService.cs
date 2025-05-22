using greenshopApp.Application.Interfaces.Auth;
using greenshopApp.Application.StatusCodes;
using greenshopApp.Persistence.Models;
using greenshopApp.Persistence.Options;
using greenshopApp.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using static greenshopApp.Application.StatusCodes.UserStatusCodes;

namespace greenshopApp.Application.RepositoryServices
{
    public class UserRepositoryService
    {
        private readonly GenericRepository<UserEntity> _repository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtProvider _jwtProvider;
        public UserRepositoryService(
            GenericRepository<UserEntity> repository, 
            IPasswordHasher passwordHasher,
            IJwtProvider jwtProvider
        )
        {
            _repository = repository;
            _passwordHasher = passwordHasher;
            _jwtProvider = jwtProvider;
        }

        public async Task<USER_STATUS_CODES> RegisterAsync (string username, string email, string password)
        {
            UserEntity? emailUser = await GetByEmailAsync(email);

            if (emailUser == null)
            {
                var hashedPassword = _passwordHasher.Generate(password);
                UserEntity user = UserEntity.Create(username, email, hashedPassword); //Проверить email надо
                await _repository.AddAsync(user);
                return USER_STATUS_CODES.SUCCESSFUL_REGISTRATION;
            }
            else
            {
                return USER_STATUS_CODES.EMAIL_IS_BUSY;
            }
                    
        }

        public async Task<(USER_STATUS_CODES status, string? token)> LoginAsync(string email, string password)
        {
            UserEntity? user = await GetByEmailAsync(email);
            if (user == null)
            {
                return (USER_STATUS_CODES.INVALID_CREDENTIALS, null);
            }

            bool isAuthentificated = _passwordHasher.Verify(password, user.PasswordHash);
            if (!isAuthentificated)
            {
                return (USER_STATUS_CODES.INVALID_CREDENTIALS, null);
            }

            var token = _jwtProvider.GenerateToken(user);
            return (USER_STATUS_CODES.SUCCESSFUL_LOGIN, token);
        }

        // Get services
        public async Task<List<UserEntity>> GetByPageAsync(int page, int pageSize)
        {
            return await _repository.GetQueryable()
                .AsNoTracking()
                .OrderBy(u => u.LastName)
                .ThenBy(u => u.FirstName)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<UserEntity?> GetByEmailAsync(string email)
        {
            return await _repository.GetQueryable()
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        // Update services
        public async Task UpdateFieldsAsync(Guid id, UserEntityOptions options)
        {
            var userEntity = await _repository.GetByIdAsync(id);
            var entityType = typeof(UserEntity);

            foreach (var optionProperty in typeof(UserEntityOptions).GetProperties())
            {
                var value = optionProperty.GetValue(options);
                if (value == null) continue;

                var entityProperty = entityType.GetProperty(optionProperty.Name);
                if (entityProperty != null && entityProperty.CanWrite)
                {
                    entityProperty.SetValue(userEntity, value);
                }
            }

            await _repository.UpdateAsync(userEntity);
        }

        public async Task UpdatePasswordAsync(Guid id, string newPassword)
        {
            var userEntity = await _repository.GetByIdAsync(id);
            userEntity.PasswordHash = newPassword;
            await _repository.UpdateAsync(userEntity);
        }

        public async Task UpdateContactInfoAsync(Guid id, string? email, string? phoneNumber)
        {
            var userEntity = await _repository.GetByIdAsync(id);

            if (email != null)
                userEntity.Email = email;

            if (phoneNumber != null)
                userEntity.PhoneNumber = phoneNumber;

            await _repository.UpdateAsync(userEntity);
        }

    }
}
