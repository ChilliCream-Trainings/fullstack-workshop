#if DEBUG
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace eShop.Ordering.Infrastructure;

public sealed class OrderingContextFactory : IDesignTimeDbContextFactory<OrderingContext>
{
    public OrderingContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<OrderingContext>();
        optionsBuilder.UseNpgsql("Data Source=blog.db");
        return new OrderingContext(optionsBuilder.Options);
    }
}
#endif