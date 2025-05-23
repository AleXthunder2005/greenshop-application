using greenshopApp.Persistence.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace greenshopApp.Persistence.Configurations
{
    public class PlantConfiguration : IEntityTypeConfiguration<PlantEntity>
    {
        public void Configure(EntityTypeBuilder<PlantEntity> builder)
        {
            builder.HasKey(p => p.Id);

            builder
                .HasMany(p => p.OrderPlants)
                .WithOne(op => op.Plant)
                .HasForeignKey(op => op.PlantId);
        }
    }
}