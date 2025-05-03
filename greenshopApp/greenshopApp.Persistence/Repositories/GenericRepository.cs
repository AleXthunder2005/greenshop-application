using greenshopApp.Persistence.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace greenshopApp.Persistence.Repositories
{
    public class GenericRepository<TEntity>
        where TEntity : class, IEntity
    {
        protected readonly GreenshopDbContext _dbContext;

        public GenericRepository(GreenshopDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public virtual async Task AddAsync(TEntity entity)
        {
            await _dbContext.Set<TEntity>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public virtual async Task DeleteAsync(Guid id)
        {
            await _dbContext.Set<TEntity>()
                .Where(entity => entity.Id == id)
                .ExecuteDeleteAsync();
        }

        public virtual async Task<List<TEntity>> GetAsync()
        {
            return await _dbContext.Set<TEntity>()
                .AsNoTracking()
                .ToListAsync();
        }
        
        public virtual async Task<TEntity> GetByIdAsync(Guid id)
        {
            var entity = await _dbContext.Set<TEntity>()
                .AsNoTracking()
                .FirstOrDefaultAsync(entity => entity.Id == id);

            if (entity == null) throw new KeyNotFoundException($"{typeof(TEntity).Name} with ID {id} was not found in the database.");
            
            return entity;
        }

        public virtual async Task UpdateAsync(TEntity entity)
        {
            _dbContext.Set<TEntity>().Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public virtual IQueryable<TEntity> GetQueryable()
        {
            return _dbContext.Set<TEntity>();
        }
    }
}
