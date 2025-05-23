using greenshopApp.Persistence.Configurations;
using greenshopApp.Persistence.Models;
using Microsoft.EntityFrameworkCore;

namespace greenshopApp.Persistence
{
    public class GreenshopDbContext : DbContext
    {
        public GreenshopDbContext(DbContextOptions<GreenshopDbContext> options) : base(options) { }

        // DbSet для каждой сущности
        public DbSet<OrderEntity> Orders { get; set; }
        public DbSet<PlantEntity> Plants { get; set; }
        public DbSet<UserEntity> Users { get; set; }

        // Не забудьте добавить DbSet для OrderPlantEntity
        public DbSet<OrderPlantEntity> OrderPlants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Применяем конфигурации для каждой сущности
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new PlantConfiguration());
            modelBuilder.ApplyConfiguration(new OrderPlantConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}