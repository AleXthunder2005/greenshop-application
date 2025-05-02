using greenshopApp.Persistence.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace greenshopApp.Persistence.Configurations
{
    class OrderConfiguration : IEntityTypeConfiguration<OrderEntity>
    {
        public void Configure(EntityTypeBuilder<OrderEntity> builder)
        {
            builder.HasKey(o => o.Id);

            builder
                .HasOne(o => o.Customer)
                .WithMany(c => c.Orders);

            builder
                .HasMany(o => o.Plants)
                .WithMany(p => p.Orders);

        }
    }
}
