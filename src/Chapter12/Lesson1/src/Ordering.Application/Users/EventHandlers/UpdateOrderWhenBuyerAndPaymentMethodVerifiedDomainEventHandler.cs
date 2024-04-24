using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.Events;

namespace eShop.Ordering.Application.Users.EventHandlers;

public class UpdateOrderWhenBuyerAndPaymentMethodVerifiedDomainEventHandler(
    IOrderRepository orderRepository)
    : INotificationHandler<BuyerAndPaymentMethodVerifiedDomainEvent>
{
    // Domain Logic comment:
    // When the Buyer and Buyer's payment method have been created or verified that they existed, 
    // then we can update the original Order with the BuyerId and PaymentId (foreign keys)
    public async Task Handle(BuyerAndPaymentMethodVerifiedDomainEvent domainEvent, CancellationToken cancellationToken)
    {
        var order = await orderRepository.GetOrderAsync(domainEvent.OrderId, cancellationToken);
        if (order is null)
        {
            throw new KeyNotFoundException($"Order with Id {domainEvent.OrderId} not found");
        }

        order.SetPaymentMethodVerified(domainEvent.User.Id, domainEvent.Payment.Id);
    }
}