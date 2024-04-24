using GreenDonut;
using HotChocolate.Resolvers;
using Microsoft.Extensions.DependencyInjection;

namespace eShop.Ordering.Infrastructure.DataLoaders;

internal abstract class OrderingBatchDataLoaderBase<TKey, TValue>(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions options)
    : BatchDataLoader<TKey, TValue>(batchScheduler, options)
    where TKey : notnull
{
    protected sealed override async Task<IReadOnlyDictionary<TKey, TValue>> LoadBatchAsync(
        IReadOnlyList<TKey> keys,
        CancellationToken cancellationToken)
    {
        await using var scope = serviceProvider.CreateAsyncScope();
        await using var context = scope.ServiceProvider.GetRequiredService<OrderingContext>();
        return await LoadBatchAsync(keys, context, cancellationToken);
    }

    protected abstract Task<IReadOnlyDictionary<TKey, TValue>> LoadBatchAsync(
        IReadOnlyList<TKey> keys,
        OrderingContext context,
        CancellationToken cancellationToken);
}