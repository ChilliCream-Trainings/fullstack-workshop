using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Domain.Events;

/// <summary>
/// Event used when the order is paid
/// </summary>
public sealed record OrderStatusChangedToPaidDomainEvent(
    int OrderId,
    IEnumerable<OrderItem> OrderItems)
    : Event;
