using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace eShop.Ordering.Infrastructure.EntityConfigurations;

internal sealed class PaymentMethodEntityTypeConfiguration : IEntityTypeConfiguration<PaymentMethod>
{
    public void Configure(EntityTypeBuilder<PaymentMethod> paymentConfiguration)
    {
        paymentConfiguration
            .ToTable("PaymentMethods");

        paymentConfiguration
            .Ignore(b => b.Events);

        paymentConfiguration
            .Property(b => b.Id)
            .UseHiLo("PaymentMethodIdSequence");

        paymentConfiguration
            .Property<int>("BuyerId");

        paymentConfiguration
            .Property(t => t.CardHolderName)
            .HasMaxLength(200);

        paymentConfiguration
            .Property(t => t.Alias)
            .HasMaxLength(200);

        paymentConfiguration
            .Property(t => t.CardNumber)
            .HasMaxLength(25)
            .IsRequired();

        paymentConfiguration
            .Property(t => t.Expiration)
            .HasMaxLength(25);

        paymentConfiguration
            .Property(t => t.CardType);
    }
}
