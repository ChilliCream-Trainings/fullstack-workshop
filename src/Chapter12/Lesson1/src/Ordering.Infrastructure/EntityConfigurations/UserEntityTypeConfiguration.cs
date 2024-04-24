using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace eShop.Ordering.Infrastructure.EntityConfigurations;

internal sealed class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder
            .ToTable("Users");

        builder
            .Ignore(b => b.Events);

        builder
            .Property(b => b.Id)
            .HasMaxLength(128);
        
        builder
            .Property(b => b.Name)
            .HasMaxLength(128);

        builder
            .HasKey(t => t.Id);

        builder
            .HasMany(b => b.PaymentMethods)
            .WithOne();
    }
}
