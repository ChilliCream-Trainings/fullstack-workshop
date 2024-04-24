using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Domain.Events;

public sealed record BuyerAndPaymentMethodVerifiedDomainEvent(
    User User, 
    PaymentMethod Payment, 
    int OrderId)
    : Event;