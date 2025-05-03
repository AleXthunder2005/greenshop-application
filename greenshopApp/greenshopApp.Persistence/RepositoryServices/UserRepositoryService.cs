using greenshopApp.Persistence.Models;
using greenshopApp.Persistence.Options;
using greenshopApp.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace greenshopApp.Persistence.RepositoryServices
{
    public class UserRepositoryService
    {
        private readonly GenericRepository<UserEntity> _repository;

        public UserRepositoryService(GenericRepository<UserEntity> repository)
        {
            _repository = repository;
        }

        // Get services
        public async Task<List<UserEntity>> GetByAddressAsync(string address)
        {
            return await _repository.GetQueryable()
                .AsNoTracking()
                .Where(u => u.Address.Contains(address))
                .ToListAsync();
        }

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
            userEntity.Password = newPassword;
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

        public async Task UpdatePaymentInfoAsync(Guid id, string cardNumber)
        {
            var userEntity = await _repository.GetByIdAsync(id);
            userEntity.CardNumber = cardNumber;
            await _repository.UpdateAsync(userEntity);
        }
    }
}
