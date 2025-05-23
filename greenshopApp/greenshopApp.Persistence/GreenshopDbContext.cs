using greenshopApp.Persistence.Configurations;
using greenshopApp.Persistence.Models;
using Microsoft.EntityFrameworkCore;

namespace greenshopApp.Persistence
{
    public class GreenshopDbContext : DbContext
    {
        public GreenshopDbContext(DbContextOptions<GreenshopDbContext> options) : base(options) { }

        public DbSet<OrderEntity> Orders { get; set; }
        public DbSet<PlantEntity> Plants { get; set; }
        public DbSet<UserEntity> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Применяем конфигурации
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new PlantConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}
