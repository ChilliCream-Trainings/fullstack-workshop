using eShop.IntegrationEvents;
using eShop.Ordering.Application.Common.Contracts;
using eShop.Ordering.Application.Orders.Contracts;
using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.Ordering.Domain.Common;
using eShop.Ordering.Infrastructure;
using eShop.Ordering.Infrastructure.DataLoaders;
using eShop.Ordering.Infrastructure.Repositories;
using GreenDonut;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Microsoft.Extensions.DependencyInjection;

public static class OrderingInfrastructureServiceCollectionExtensions
{
    public static IHostApplicationBuilder AddInfrastructureLayer(
        this IHostApplicationBuilder builder,
        string connectionName = "OrderingDB")
    {
        builder.AddNpgsqlDbContext<OrderingContext>(connectionName);
        builder.AddNpgsqlDataSource(connectionName);
        builder.Services.AddMigration<OrderingContext>();
        builder.Services.AddInfrastructureLayer();
        return builder;
    }

    internal static IServiceCollection AddInfrastructureLayer(this IServiceCollection services)
    {
        services.AddHttpClient();

        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IUserRepository, UserRepository>();

        services.AddDataLoader<IOrderByIdDataLoader, OrderByIdDataLoader>();
        services.AddDataLoader<IOrdersByUserIdDataLoader, OrdersByUserIdDataLoader>();
        services.AddDataLoader<IProductByIdDataLoader>(
            sp => new ProductByIdDataLoader(
                sp.GetRequiredService<IHttpClientFactory>().CreateClient,
                sp.GetRequiredService<IBatchScheduler>(),
                new DataLoaderOptions()));

        services.AddScoped<OrderingDataContext>();
        services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<OrderingDataContext>());
        services.AddScoped<IOrderingDataContext>(sp
            => sp.GetRequiredService<OrderingDataContext>());

        services.AddPostgresIntegrationEvents<OrderingContext>();

        services.AddSingleton(TimeProvider.System);

        return services;
    }
}
