using eShop.IntegrationEvents;
using eShop.Ordering.Application.Common.InputModels;
using eShop.Ordering.Application.Orders.Commands.CreateOrder;
using eShop.Ordering.Application.Orders.Contracts;
using eShop.Ordering.Application.Orders.Queries;
using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.SessionManagement;
using GreenDonut;
using GreenDonut.DependencyInjection;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Squadron;
using CardType = eShop.Ordering.Domain.AggregatesModels.UserAggregate.CardType;
using OrderReadModel = eShop.Ordering.Application.Common.ReadModels.Order;
using Snapshot = CookieCrumble.Snapshot;

namespace eShop.Ordering.Infrastructure;

public class IntegrationTests(PostgreSqlResource resource) : IClassFixture<PostgreSqlResource>
{
    [Fact]
    public async Task CreateOrder_NewUser()
    {
        // Arrange
        var connectionString = resource.GetConnectionString(GetDatabaseName());
        var services = new ServiceCollection()
            .AddDbContextPool<OrderingContext>(c => c.UseNpgsql(connectionString))
            .AddApplicationLayer()
            .AddInfrastructureLayer()
            .ReplaceDataLoader<IProductByIdDataLoader, MockProductDataLoader>()
            .AddScoped<ISession, MockSession>()
            .AddScoped<MockIntegrationEventPublisher>()
            .AddScoped<IIntegrationEventPublisher>(sp => sp.GetRequiredService<MockIntegrationEventPublisher>())
            .AddLogging()
            .BuildServiceProvider();

        using (var scope = services.CreateScope())
        {
            await scope.ServiceProvider
                .GetRequiredService<OrderingContext>()
                .Database
                .EnsureCreatedAsync();
        }

        // Act
        var createOrder = new CreateOrderCommand(
            new AddressInput(
                "street",
                "city",
                "state",
                "country",
                "zipcode"),
            new PaymentMethodInput(
                "979779797979799789",
                "440",
                "Foo Bar",
                CardType.Visa,
                DateOnly.FromDateTime(DateTime.Now.AddYears(4))),
            new[]
            {
                new OrderItemInput(1, 1, 3),
            });

        int? orderId;
        IReadOnlyList<IntegrationEventRecord> receivedEvents;

        using (var scope = services.CreateScope())
        {
            var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();
            orderId = await mediator.Send(createOrder);
            receivedEvents = scope.ServiceProvider.GetRequiredService<MockIntegrationEventPublisher>().ReceivedEvents;
        }

        // Assert
        OrderReadModel? resolvedOrder;
        User? resolvedUser;

        using (var scope = services.CreateScope())
        {
            var orderQuery = scope.ServiceProvider.GetRequiredService<GetOrderQuery>();
            resolvedOrder = await orderQuery.ExecuteAsync(orderId.Value, true);

            var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
            resolvedUser = await userRepository.GetUserAsync("user1@test.com");
        }

        await Snapshot
            .Create()
            .Add(resolvedOrder, "Order Read Model")
            .Add(resolvedUser, "User Aggregate")
            .Add(receivedEvents, "Integration Events")
            .MatchMarkdownAsync();
    }

    private static string GetDatabaseName()
        => $"db_{Guid.NewGuid():N}";
}

file class MockSession : ISession
{
    public UserInfo User => new("user1@test.com", "user1", true);
}

file class MockIntegrationEventPublisher : IIntegrationEventPublisher
{
    private readonly object _sync = new();
    private readonly List<IntegrationEventRecord> _receivedEvents = new();

    public IReadOnlyList<IntegrationEventRecord> ReceivedEvents => _receivedEvents;

    public Task PublishAsync<T>(
        T integrationEvent,
        CancellationToken cancellationToken = default)
        where T : IntegrationEvent
    {
        lock (_sync)
        {
            _receivedEvents.Add(new IntegrationEventRecord(typeof(T).Name, integrationEvent));
        }
        return Task.CompletedTask;
    }

    public Task PublishAsync<T>(
        ReadOnlyMemory<T> integrationEvents,
        CancellationToken cancellationToken = default)
        where T : IntegrationEvent
    {
        lock (_sync)
        {
            foreach (var integrationEvent in integrationEvents.Span)
            {
                _receivedEvents.Add(new IntegrationEventRecord(typeof(T).Name, integrationEvent));
            }
        }
        return Task.CompletedTask;
    }
}

file record IntegrationEventRecord(string Type, IntegrationEvent Message);

file class MockProductDataLoader(DataLoaderOptions options)
    : CacheDataLoader<int, ProductInfo>(options), IProductByIdDataLoader
{
    protected override Task<ProductInfo> LoadSingleAsync(int key, CancellationToken cancellationToken)
        => Task.FromResult(
            new ProductInfo
            {
                Id = key,
                Price = 1,
                Name = $"Product {key}",
                ImageUrl = new Uri("http://image.com"),
            });
}

file static class Extensions
{
    public static IServiceCollection ReplaceDataLoader<TService, TImpl>(this IServiceCollection services)
        where TService : class, IDataLoader
        where TImpl : class, TService
    {
        ServiceDescriptor? descriptor = null;

        foreach (var service in services)
        {
            if (service is { IsKeyedService: false, ImplementationInstance: DataLoaderRegistration reg, } &&
                reg.ServiceType == typeof(TService))
            {
                descriptor = service;
                break;
            }
        }

        if (descriptor is not null)
        {
            services.Remove(descriptor);
        }

        return services.AddDataLoader<TService, TImpl>();
    }
}