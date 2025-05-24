
using greenshopApp.Persistence.Models;
using greenshopApp.Persistence.Options;
using greenshopApp.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace greenshopApp.Application.RepositoryServices
{
    public class PlantRepositoryService
    {
        private readonly GenericRepository<PlantEntity> _repository;
        public PlantRepositoryService(GenericRepository<PlantEntity> repository)
        {
            _repository = repository;
        }

        //Get service
        public async Task<List<PlantEntity>> GetAsync()
        {
            return await _repository.GetAsync();
        }
        public async Task<PlantEntity?> GetByIdAsync(Guid plantId)
        {
            return await _repository.GetByIdAsync(plantId);
        }

        public async Task AddAsync(PlantEntity plant)
        {
            await _repository.AddAsync(plant);
        }

        public async Task DeleteAsync(Guid plantId)
        {
            await _repository.DeleteAsync(plantId);
        }

        public async Task UpdateAsync(PlantEntity plant)
        {
            await _repository.UpdateAsync(plant);
        }


        public async Task UpdateFieldsAsync(Guid id, PlantEntityOptions options)
        {
            var plantEntity = await _repository.GetByIdAsync(id);
            var entityType = typeof(PlantEntity);

            foreach (var optionProperty in typeof(PlantEntityOptions).GetProperties())
            {
                var value = optionProperty.GetValue(options);
                if (value == null) continue;

                var entityProperty = entityType.GetProperty(optionProperty.Name);
                if (entityProperty != null && entityProperty.CanWrite)
                {
                    entityProperty.SetValue(plantEntity, value);
                }
            }

            await _repository.UpdateAsync(plantEntity);
        }






        //public async Task<List<PlantEntity>> GetByFilterAsync(int size)
        //{
        //    return await _repository.GetQueryable()
        //        .AsNoTracking()
        //        .Where(p => p.Size == size)
        //        .ToListAsync();
        //}

        //public async Task<List<PlantEntity>> GetByFilterAsync(decimal minPrice, decimal maxPrice)
        //{
        //    return await _repository.GetQueryable()
        //        .AsNoTracking()
        //        .Where(p => (p.Price >= minPrice) && (p.Price <= maxPrice))
        //        .ToListAsync();
        //}

        //public async Task<List<PlantEntity>> GetByFilterAsync(int size, decimal minPrice, decimal maxPrice)
        //{
        //    return await _repository.GetQueryable()
        //        .AsNoTracking()
        //        .Where(p => (p.Price >= minPrice) && (p.Price <= maxPrice))
        //        .Where(p => p.Size == size)
        //        .ToListAsync();
        //}

        //public async Task<List<PlantEntity>> GetByPageAsync(int page, int pageSize)
        //{
        //    return await _repository.GetQueryable()
        //        .AsNoTracking()
        //        .Skip((page - 1) * pageSize)
        //        .Take(pageSize)
        //        .ToListAsync();
        //}

        //public async Task<float> GetRateAsync(Guid id) 
        //{
        //    var plantEntity = await _repository.GetByIdAsync(id);
        //    return plantEntity.SummaryNote / plantEntity.NoteCount;
        //}

        //Update service


        public async Task UpdatePriceAsync(Guid id, decimal newPrice) 
        {
            var plantEntity = await _repository.GetByIdAsync(id);
            plantEntity.Price = newPrice;
            await _repository.UpdateAsync(plantEntity);
        }
        //public async Task UpdateRateAsync(Guid id, int note)
        //{
        //    var plantEntity = await _repository.GetByIdAsync(id);
        //    plantEntity.NoteCount++;
        //    plantEntity.SummaryNote += note;
        //    await _repository.UpdateAsync(plantEntity);
        //}
        //public async Task UpdateRemainingCountAsync(Guid id, int remainingCount)
        //{
        //    var plantEntity = await _repository.GetByIdAsync(id);
        //    plantEntity.RemainingCount = remainingCount;
        //    await _repository.UpdateAsync(plantEntity);
        //}
        //public async Task DecrementRemainingCountAsync(Guid id)
        //{
        //    var plantEntity = await _repository.GetByIdAsync(id);
        //    plantEntity.RemainingCount--;
        //    await _repository.UpdateAsync(plantEntity);
        //}
        //public async Task IncrementRemainingCountAsync(Guid id)
        //{
        //    var plantEntity = await _repository.GetByIdAsync(id);
        //    plantEntity.RemainingCount++;
        //    await _repository.UpdateAsync(plantEntity);
        //}
    }
}
