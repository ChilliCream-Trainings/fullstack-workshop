using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Domain.Events;

public sealed record OrderCancelledDomainEvent(Order Order) : Event;
