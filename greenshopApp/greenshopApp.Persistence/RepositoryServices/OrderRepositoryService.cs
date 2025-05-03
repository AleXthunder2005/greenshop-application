using greenshopApp.Persistence.Models;
using greenshopApp.Persistence.Options;
using greenshopApp.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace greenshopApp.Persistence.RepositoryServices
{
    public class OrderRepositoryService
    {
        private readonly GenericRepository<OrderEntity> _repository;

        public OrderRepositoryService(GenericRepository<OrderEntity> repository)
        {
            _repository = repository;
        }

        // Get services
        public async Task<List<OrderEntity>> GetByCustomerAsync(Guid customerId)
        {
            return await _repository.GetQueryable()
                .AsNoTracking()
                .Where(o => o.CustomerID == customerId)
                .ToListAsync();
        }

        public async Task<List<OrderEntity>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _repository.GetQueryable()
                .AsNoTracking()
                .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
                .ToListAsync();
        }

        public async Task<List<OrderEntity>> GetByPageAsync(int page, int pageSize)
        {
            return await _repository.GetQueryable()
                .AsNoTracking()
                .OrderByDescending(o => o.OrderDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        // Update services
        public async Task UpdateFieldsAsync(Guid id, OrderEntityOptions options)
        {
            var orderEntity = await _repository.GetByIdAsync(id);
            var entityType = typeof(OrderEntity);

            foreach (var optionProperty in typeof(OrderEntityOptions).GetProperties())
            {
                var value = optionProperty.GetValue(options);
                if (value == null) continue;

                var entityProperty = entityType.GetProperty(optionProperty.Name);
                if (entityProperty != null && entityProperty.CanWrite)
                {
                    entityProperty.SetValue(orderEntity, value);
                }
            }

            await _repository.UpdateAsync(orderEntity);
        }

        public async Task UpdateDeliveryAddressAsync(Guid id, string newAddress)
        {
            var orderEntity = await _repository.GetByIdAsync(id);
            orderEntity.DeliveryAdress = newAddress;
            await _repository.UpdateAsync(orderEntity);
        }

        public async Task UpdateDeliveryDateAsync(Guid id, DateTime newDeliveryDate)
        {
            var orderEntity = await _repository.GetByIdAsync(id);
            orderEntity.DeliveryDate = newDeliveryDate;
            await _repository.UpdateAsync(orderEntity);
        }

        public async Task MarkAsDeliveredAsync(Guid id)
        {
            var orderEntity = await _repository.GetByIdAsync(id);
            orderEntity.DeliveryDate = DateTime.UtcNow;
            await _repository.UpdateAsync(orderEntity);
        }
    }
}
