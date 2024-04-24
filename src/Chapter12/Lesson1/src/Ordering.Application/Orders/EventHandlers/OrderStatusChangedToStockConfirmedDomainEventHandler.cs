using eShop.IntegrationEvents;
using eShop.Ordering.Application.Common.Contracts;
using eShop.Ordering.Application.IntegrationEvents;
using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.Ordering.Domain.Events;

namespace eShop.Ordering.Application.Orders.EventHandlers;

public class OrderStatusChangedToStockConfirmedDomainEventHandler(
    IOrderRepository orderRepository,
    IUserRepository userRepository,
    IIntegrationEventPublisher eventPublisher)
    : INotificationHandler<OrderStatusChangedToStockConfirmedDomainEvent>
{
    public async Task Handle(
        OrderStatusChangedToStockConfirmedDomainEvent domainEvent,
        CancellationToken cancellationToken)
    {
        var order = await orderRepository.GetOrderAsync(domainEvent.OrderId, cancellationToken);

        if (order is null)
        {
            throw new KeyNotFoundException($"Order with Id {domainEvent.OrderId} not found");
        }

        var buyer = await userRepository.GetUserAsync(order.UserId, cancellationToken);

        if (buyer is null)
        {
            throw new KeyNotFoundException($"Buyer with Id {order.UserId} not found");
        }

        var integrationEvent = new OrderStatusChangedToStockConfirmedIntegrationEvent(
            order.Id,
            (eShop.IntegrationEvents.OrderStatus)order.Status,
            buyer.Name,
            buyer.Id);
        await eventPublisher.PublishAsync(integrationEvent);
    }
}