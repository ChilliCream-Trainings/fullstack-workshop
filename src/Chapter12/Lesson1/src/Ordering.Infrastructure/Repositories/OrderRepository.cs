using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Primitives;

namespace eShop.Ordering.Infrastructure.Repositories;

public sealed class OrderRepository(OrderingContext context, IUnitOfWork unitOfWork) : IOrderRepository
{
    public IUnitOfWork UnitOfWork => unitOfWork;
    
    public async ValueTask<Order?> GetOrderAsync(int id, CancellationToken cancellationToken = default)
    {
        var order = await context.Orders.FindAsync([id,], cancellationToken: cancellationToken);

        if (order is null)
        {
            return null;
        }
        
        await context.Entry(order).Collection(b => b.Items).LoadAsync(cancellationToken);
        return order;
    }

    public void AddOrder(Order order)
    {
        ArgumentNullException.ThrowIfNull(nameof(order));
        
        context.Orders.Add(order);
    }

    public void UpdateOrder(Order order)
        => context.Entry(order).State = EntityState.Modified;
}

file static class Extensions
{
    public static TEntity? FindTracked<TEntity>(this DbContext context, params object[] keyValues)
        where TEntity : class
    {
#pragma warning disable EF1001
        var entityType = context.Model.FindEntityType(typeof(TEntity));
        var key = entityType!.FindPrimaryKey();
        var stateManager = context.GetDependencies().StateManager;
        var entry = stateManager.TryGetEntry(key!, keyValues);
        return entry?.Entity as TEntity;
#pragma warning restore EF1001
    }
}
