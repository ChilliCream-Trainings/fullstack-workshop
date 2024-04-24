using eShop.Ordering.Application.Common.ReadModels;
using eShop.Ordering.Application.Orders.Queries;

namespace eShop.Ordering.Types;

public abstract class OrderPayloadBase(int orderId)
{
    public async Task<Order?> GetOrderAsync(
        [WithOrderDetails] bool withDetails,
        GetOrderQuery getOrderQuery, 
        CancellationToken cancellationToken)
        => await getOrderQuery.ExecuteAsync(orderId, withDetails, cancellationToken);
}