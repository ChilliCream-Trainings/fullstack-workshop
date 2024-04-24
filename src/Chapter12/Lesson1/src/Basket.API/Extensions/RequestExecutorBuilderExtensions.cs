using eShop.Basket.Models;
using eShop.Basket.Services;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Serialization;
using HotChocolate.Execution;

namespace Microsoft.Extensions.DependencyInjection;

public static class RequestExecutorBuilderExtensions
{
    public static IHostApplicationBuilder AddApplicationServices(
        this IHostApplicationBuilder builder)
    {
        builder.AddDefaultAuthentication();

        builder.AddRedis("redis");
        builder.Services.AddSingleton<IShoppingBasketService, RedisShoppingBasketService>();    
        return builder;
    }

    public static IHostApplicationBuilder AddGraphQLServer(this IHostApplicationBuilder builder)
    {
        builder.Services
            .AddGraphQLServer()
            .AddGraphQLConventions(enableNode: false)
            .AddGlobalObjectIdentification(registerNodeInterface: false)
            .AddTypes()
            .AddObjectType<ShoppingBasket>(c => c.Name("Basket"))
            .AddObjectType<ShoppingBasketItem>(c => c.Name("BasketItem"));

        return builder;
    }
}
