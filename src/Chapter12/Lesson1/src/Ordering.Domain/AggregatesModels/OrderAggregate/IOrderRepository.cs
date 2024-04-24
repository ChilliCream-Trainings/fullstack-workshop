using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Domain.AggregatesModels.OrderAggregate;

/// <summary>
/// Represents the order repository contract.
/// </summary>
public interface IOrderRepository : IRepository
{
    /// <summary>
    /// Gets an order by its id.
    /// </summary>
    /// <param name="id">
    /// The order id.
    /// </param>
    /// <param name="cancellationToken">
    /// The cancellation token. Default is <see cref="CancellationToken.None"/>.
    /// </param>
    /// <returns>
    /// Returns an order that matches the id; otherwise, null.
    /// </returns>
    ValueTask<Order?> GetOrderAsync(int id, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Adds a new order.
    /// </summary>
    /// <param name="order">
    /// The new order to add.
    /// </param>
    void AddOrder(Order order);

    /// <summary>
    /// Updates an existing order.
    /// </summary>
    /// <param name="order">
    /// The order to update.
    /// </param>
    void UpdateOrder(Order order);
}
