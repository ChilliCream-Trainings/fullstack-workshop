using HotChocolate.Resolvers;

namespace Microsoft.Extensions.DependencyInjection;

public static class SharedServiceCollectionExtensions
{
    public static IServiceCollection AddScopedServiceInitializer<TService>(
        this IServiceCollection builder,
        Action<TService, TService> initializer)
    {
        if (builder == null)
        {
            throw new ArgumentNullException(nameof(builder));
        }

        if (initializer == null)
        {
            throw new ArgumentNullException(nameof(initializer));
        }

        builder.AddSingleton<IServiceScopeInitializer>(
            new DelegateServiceInitializer<TService>(initializer));
        return builder;
    }
}

file sealed class DelegateServiceInitializer<TService>(Action<TService, TService> initializer)
    : ServiceInitializer<TService>
{
    private readonly Action<TService, TService> _initializer = initializer ??
        throw new ArgumentNullException(nameof(initializer));

    protected override void Initialize(TService requestScopeService, TService resolverScopeService)
        => _initializer(requestScopeService, resolverScopeService);
}
