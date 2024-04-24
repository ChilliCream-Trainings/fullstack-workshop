using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace eShop.Ordering.Infrastructure.EntityConfigurations;

internal sealed class OrderEntityTypeConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder
            .ToTable("Orders");

        builder
            .Ignore(b => b.Events);

        builder
            .Property(o => o.Id)
            .UseHiLo("OrderIdSequence");

        //Address value object persisted as owned entity type supported since EF Core 2.0
        builder
            .OwnsOne(o => o.Address);

        builder
            .Property(o => o.Status);

        builder
            .Property(o => o.PaymentId)
            .HasColumnName("PaymentMethodId");

        builder
            .HasOne<PaymentMethod>()
            .WithMany()
            .HasForeignKey(o => o.PaymentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(o => o.UserId);
    }
}
