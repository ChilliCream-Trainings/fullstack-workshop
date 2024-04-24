using Microsoft.EntityFrameworkCore;
using Squadron;

namespace eShop.Ordering.Infrastructure;

public class OrderingContextTests(PostgreSqlResource resource) : IClassFixture<PostgreSqlResource>
{
    [Fact]
    public async Task CreateDatabase()
    {
        // Arrange
        var options = GetDbContextOptions();
        await using var context = new OrderingContext(options);

        // Act
        var success = await context.Database.EnsureCreatedAsync();

        // Assert
        Assert.True(success);
    }

    private DbContextOptions<OrderingContext> GetDbContextOptions()
        => new DbContextOptionsBuilder<OrderingContext>()
            .UseNpgsql(resource.GetConnectionString(GetDatabaseName()))
            .Options;

    private static string GetDatabaseName()
        => $"db_{Guid.NewGuid():N}";
}