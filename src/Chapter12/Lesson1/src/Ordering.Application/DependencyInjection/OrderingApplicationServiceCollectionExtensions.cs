using eShop.Ordering.Application.Orders.EventHandlers;
using eShop.Ordering.Application.Orders.Queries;
using Microsoft.Extensions.Hosting;

namespace Microsoft.Extensions.DependencyInjection;

public static class OrderingApplicationServiceCollectionExtensions
{
    public static IHostApplicationBuilder AddApplicationLayer(
        this IHostApplicationBuilder builder)
    {
        builder.Services.AddApplicationLayer();
        return builder;
    }

    public static IServiceCollection AddApplicationLayer(this IServiceCollection services)
    {
        services.AddMediatR(c => { c.RegisterServicesFromAssemblyContaining<OrderShippedDomainEventHandler>(); });
        services.AddScoped<GetOrderQuery>();
        services.AddScoped<GetOrdersByUserQuery>();
        
        return services;
    }

    private static IServiceCollection AddIntegrationEventHandlers(this IServiceCollection services)
    {
        return services;
    }
}