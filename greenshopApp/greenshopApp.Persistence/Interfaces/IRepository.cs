using greenshopApp.Persistence.Models;
using Microsoft.EntityFrameworkCore;

namespace greenshopApp.Persistence.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class, IEntity
    {
        Task<List<TEntity>> GetAsync();
        Task<TEntity?> GetByIdAsync(Guid id);
        Task AddAsync(TEntity entity);
        Task UpdateAsync(TEntity entity);
        Task DeleteAsync(Guid id);
    }
}
