using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using greenshopApp.Persistence.Models;

namespace greenshopApp.Persistence.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<OrderEntity>
    {
        public void Configure(EntityTypeBuilder<OrderEntity> builder)
        {
            builder.HasKey(o => o.Id);

            builder
                .HasOne(o => o.Customer)
                .WithMany(c => c.Orders)
                .HasForeignKey(o => o.CustomerID);

            builder
                .HasMany(o => o.OrderPlants)
                .WithOne(op => op.Order)
                .HasForeignKey(op => op.OrderId);
        }
    }

    public class OrderPlantConfiguration : IEntityTypeConfiguration<OrderPlantEntity>
    {
        public void Configure(EntityTypeBuilder<OrderPlantEntity> builder)
        {
            // Define composite primary key
            builder.HasKey(op => new { op.OrderId, op.PlantId });

            // Configure relationships
            builder
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderPlants)
                .HasForeignKey(op => op.OrderId);

            builder
                .HasOne(op => op.Plant)
                .WithMany(p => p.OrderPlants)
                .HasForeignKey(op => op.PlantId);

            // Configure Quantity as required
            builder.Property(op => op.Quantity)
                .IsRequired()
                .HasDefaultValue(1);
        }
    }
}