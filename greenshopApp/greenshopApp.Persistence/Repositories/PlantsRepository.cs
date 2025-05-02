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
                .OrderBy(p => p.Name)
                .ToListAsync();
        }

        public async Task<PlantEntity?> GetById(Guid id)
        {
            return await _dbContext.Plants
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<PlantEntity>> GetByFilter(int size)
        {
            return await _dbContext.Plants
                .AsNoTracking()
                .Where(p => p.Size == size)
                .ToListAsync();
        }

        public async Task<List<PlantEntity>> GetByFilter(decimal minPrice, decimal maxPrice)
        {
            return await _dbContext.Plants
                .AsNoTracking()
                .Where(p => (p.Price >= minPrice) && (p.Price <= maxPrice))
                .ToListAsync();
        }

        public async Task<List<PlantEntity>> GetByFilter(int size, decimal minPrice, decimal maxPrice)
        {
            return await _dbContext.Plants
                .AsNoTracking()
                .Where(p => (p.Price >= minPrice) && (p.Price <= maxPrice))
                .Where(p => p.Size == size)
                .ToListAsync();
        }

        public async Task<List<PlantEntity>> GetByPage(int page, int pageSize)
        {
            return await _dbContext.Plants
                .AsNoTracking()
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task Add(
            Guid id,
            string category,
            string name,
            decimal price,
            int size,
            string description = "",
            string pictureFileName = "",
            int remainingCount = 0)
        {
            var plantEntity = new PlantEntity();
            plantEntity.Id = id;
            plantEntity.Category = category;
            plantEntity.Name = name;
            plantEntity.Price = price;
            plantEntity.Size = size;
            plantEntity.Description = description;
            plantEntity.PictureFileName = pictureFileName;
            plantEntity.RemainingCount = remainingCount;

            await _dbContext.Plants.AddAsync(plantEntity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(
            Guid id,
            string category,
            string name,
            decimal price,
            int size,
            string description = "",
            string pictureFileName = "",
            int remainingCount = 0)
        {
            await _dbContext.Plants
                .Where(p => p.Id == id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(p => p.Category, category)
                    .SetProperty(p => p.Name, name)
                    .SetProperty(p => p.Price, price)
                    .SetProperty(p => p.Size, size)
                    .SetProperty(p => p.Description, description)
                    .SetProperty(p => p.PictureFileName, pictureFileName)
                    .SetProperty(p => p.RemainingCount, remainingCount)
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
