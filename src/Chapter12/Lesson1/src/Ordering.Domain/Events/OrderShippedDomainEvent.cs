using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Domain.Events;

public sealed record OrderShippedDomainEvent(Order Order) : Event;
