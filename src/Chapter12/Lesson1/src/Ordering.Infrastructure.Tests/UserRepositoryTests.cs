using CookieCrumble;
using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Squadron;

namespace eShop.Ordering.Infrastructure;

public class UserRepositoryTests(PostgreSqlResource resource) : IClassFixture<PostgreSqlResource>
{
    [Fact]
    public async Task CreateUser()
    {
        // Arrange
        var options = GetDbContextOptions();
        var services = new ServiceCollection()
            .AddScoped(_ => new OrderingContext(options))
            .AddApplicationLayer()
            .AddInfrastructureLayer()
            .BuildServiceProvider();

        using (var scope = services.CreateScope())
        {
            await scope.ServiceProvider
                .GetRequiredService<OrderingContext>()
                .Database
                .EnsureCreatedAsync();
        }

        // Act
        using (var scope = services.CreateScope())
        {
            var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
            var user = new User("user1@test.com", "user1");
            userRepository.AddUser(user);
            await userRepository.UnitOfWork.SaveChangesAsync();
        }

        // Assert
        User? resolvedUser;
        using (var scope = services.CreateScope())
        {
            var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
            resolvedUser = await userRepository.GetUserAsync("user1@test.com");
        }
        
        resolvedUser.MatchMarkdownSnapshot();
    }

    private DbContextOptions<OrderingContext> GetDbContextOptions()
        => new DbContextOptionsBuilder<OrderingContext>()
            .UseNpgsql(resource.GetConnectionString(GetDatabaseName()))
            .Options;

    private static string GetDatabaseName()
        => $"db_{Guid.NewGuid():N}";
}
