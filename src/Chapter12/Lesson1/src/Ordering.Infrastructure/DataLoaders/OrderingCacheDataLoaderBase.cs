using GreenDonut;
using Microsoft.Extensions.DependencyInjection;

namespace eShop.Ordering.Infrastructure.DataLoaders;

internal abstract class OrderingCacheDataLoaderBase<TKey, TValue>(
    IServiceProvider serviceProvider,
    DataLoaderOptions options)
    : CacheDataLoader<TKey, TValue>(options)
    where TKey : notnull
{
    protected sealed override async Task<TValue> LoadSingleAsync(
        TKey key,
        CancellationToken cancellationToken)
    {
        await using var scope = serviceProvider.CreateAsyncScope();
        await using var context = scope.ServiceProvider.GetRequiredService<OrderingContext>();
        return await LoadSingleAsync(key, context, cancellationToken);
    }

    protected abstract Task<TValue> LoadSingleAsync(
        TKey key,
        OrderingContext context,
        CancellationToken cancellationToken);
}