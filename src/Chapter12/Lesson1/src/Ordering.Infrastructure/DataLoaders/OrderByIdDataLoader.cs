using eShop.Ordering.Application.Common.ReadModels;
using eShop.Ordering.Application.Orders.Contracts;
using GreenDonut;
using Microsoft.EntityFrameworkCore;

namespace eShop.Ordering.Infrastructure.DataLoaders;

internal sealed class OrderByIdDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions options)
    : OrderingBatchDataLoaderBase<OrderKey, Order>(serviceProvider, batchScheduler, options)
    , IOrderByIdDataLoader
{
    protected override async Task<IReadOnlyDictionary<OrderKey, Order>> LoadBatchAsync(
        IReadOnlyList<OrderKey> keys,
        OrderingContext context,
        CancellationToken cancellationToken)
    {
        var result = new Dictionary<OrderKey, Order>();

        foreach (var group in keys.GroupBy(t => t.WithDetails))
        {
            var query = context.Orders.Where(t => group.Select(k => k.Id).Contains(t.Id)).MapOrder(group.Key);
            await foreach (var order in query.AsAsyncEnumerable().WithCancellation(cancellationToken))
            {
                result.Add(new OrderKey(order.Id, group.Key), order);
            }
        }

        return result;
    }
}