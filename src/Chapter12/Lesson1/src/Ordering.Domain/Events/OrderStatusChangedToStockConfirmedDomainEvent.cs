using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Domain.Events;

/// <summary>
/// Event used when the order stock items are confirmed
/// </summary>
public sealed record OrderStatusChangedToStockConfirmedDomainEvent(int OrderId) : Event;
