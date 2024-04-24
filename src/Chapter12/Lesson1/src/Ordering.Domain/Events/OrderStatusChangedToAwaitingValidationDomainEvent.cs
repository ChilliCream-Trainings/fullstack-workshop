using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Domain.Events;

/// <summary>
/// Event used when the grace period order is confirmed
/// </summary>
public sealed record OrderStatusChangedToAwaitingValidationDomainEvent(
    int OrderId,
    IEnumerable<OrderItem> OrderItems)
    : Event;
