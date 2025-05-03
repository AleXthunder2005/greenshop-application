using greenshopApp.Persistence.Models;
using Microsoft.EntityFrameworkCore;

namespace greenshopApp.Persistence.Repositories
{
    public class PlantsRepository
    {
        private readonly GreenshopDbContext _dbContext;

        public PlantsRepository(GreenshopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<PlantEntity>> Get()
        {
            return await _dbContext.Plants
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<PlantEntity?> GetById(Guid id)
        {
            return await _dbContext.Plants
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task Add(PlantEntity plantEntity)
        {
            await _dbContext.Plants.AddAsync(plantEntity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(PlantEntity plantEntity)
        {
            await _dbContext.Plants
                .Where(p => p.Id == plantEntity.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(p => p.Category, plantEntity.Category)
                    .SetProperty(p => p.Name, plantEntity.Name)
                    .SetProperty(p => p.Price, plantEntity.Price)
                    .SetProperty(p => p.Size, plantEntity.Size)
                    .SetProperty(p => p.Description, plantEntity.Description)
                    .SetProperty(p => p.PictureFileName, plantEntity.PictureFileName)
                    .SetProperty(p => p.RemainingCount, plantEntity.RemainingCount)
                );
        }

        public async Task Delete(Guid id)
        {
            await _dbContext.Plants
                .Where(p => p.Id == id)
                .ExecuteDeleteAsync();
        }
    }
}
