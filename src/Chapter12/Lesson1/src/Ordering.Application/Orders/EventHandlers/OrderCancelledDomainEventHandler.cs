using eShop.IntegrationEvents;
using eShop.Ordering.Application.Common.Contracts;
using eShop.Ordering.Application.IntegrationEvents;
using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.Ordering.Domain.Events;

namespace eShop.Ordering.Application.Orders.EventHandlers;

public sealed class OrderCancelledDomainEventHandler(
    IOrderRepository orderRepository,
    IUserRepository userRepository,
    IIntegrationEventPublisher eventPublisher)
    : INotificationHandler<OrderCancelledDomainEvent>
{
    public async Task Handle(OrderCancelledDomainEvent domainEvent, CancellationToken cancellationToken)
    {
        var order = await orderRepository.GetOrderAsync(domainEvent.Order.Id, cancellationToken);

        if (order is null)
        {
            throw new KeyNotFoundException($"Order with Id {domainEvent.Order.Id} not found");
        }

        var user = await userRepository.GetUserAsync(order.UserId, cancellationToken);

        if (user is null)
        {
            throw new KeyNotFoundException($"User with Id {order.UserId} not found");
        }

        var integrationEvent = new OrderStatusChangedToCancelledIntegrationEvent(
            order.Id,
            (eShop.IntegrationEvents.OrderStatus)order.Status,
            user.Name,
            user.Id);
        await eventPublisher.PublishAsync(integrationEvent);
    }
}