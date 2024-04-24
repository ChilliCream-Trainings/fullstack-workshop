using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Domain.Events;

/// <summary>
/// Event used when an order is created
/// </summary>
public record OrderStartedDomainEvent(
    Order Order, 
    string UserId,
    string UserName,
    string CardNumber,
    string CardSecurityNumber,
    string CardHolderName,
    CardType CardType,
    DateOnly CardExpiration) 
    : Event;
