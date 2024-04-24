using eShop.IntegrationEvents.EntityFramework.Postgres;
using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.Ordering.Infrastructure.EntityConfigurations;
using Microsoft.EntityFrameworkCore;

namespace eShop.Ordering.Infrastructure;

public sealed class OrderingContext(DbContextOptions<OrderingContext> options) : DbContext(options)
{
    public DbSet<Order> Orders => Set<Order>();

    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    public DbSet<PaymentMethod> Payments => Set<PaymentMethod>();

    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new PaymentMethodEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new OrderEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new OrderItemEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
        modelBuilder.UseIntegrationEvents();
    }
}
