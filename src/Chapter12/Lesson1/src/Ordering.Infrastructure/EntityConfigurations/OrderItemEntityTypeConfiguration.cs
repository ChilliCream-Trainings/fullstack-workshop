using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace eShop.Ordering.Infrastructure.EntityConfigurations;

internal class OrderItemEntityTypeConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> orderItemConfiguration)
    {
        orderItemConfiguration
            .ToTable("OrderItems");

        orderItemConfiguration
            .Ignore(b => b.Events);

        orderItemConfiguration
            .Property(o => o.Id)
            .UseHiLo("OrderItemIdSequence");

        orderItemConfiguration
            .Property<int>("OrderId");
        
        orderItemConfiguration
            .HasKey(t => t.Id);
        ;
    }
}
