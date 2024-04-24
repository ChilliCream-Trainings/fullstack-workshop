using eShop.IntegrationEvents;
using eShop.Ordering.Application.Common.Contracts;
using eShop.Ordering.Application.IntegrationEvents;
using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.Ordering.Domain.Events;

namespace eShop.Ordering.Application.Orders.EventHandlers;

public class OrderStatusChangedToPaidDomainEventHandler(
    IOrderRepository orderRepository,
    IUserRepository userRepository,
    IIntegrationEventPublisher eventPublisher)
    : INotificationHandler<OrderStatusChangedToPaidDomainEvent>
{
    public async Task Handle(OrderStatusChangedToPaidDomainEvent domainEvent, CancellationToken cancellationToken)
    {
        var order = await orderRepository.GetOrderAsync(domainEvent.OrderId, cancellationToken);
        if (order is null)
        {
            throw new KeyNotFoundException($"Order with Id {domainEvent.OrderId} not found");
        }
        
        var user = await userRepository.GetUserAsync(order.UserId, cancellationToken);
        if (user is null)
        {
            throw new KeyNotFoundException($"Buyer with Id {order.UserId} not found");
        }

        var orderStockList = domainEvent.OrderItems.Select(
            orderItem => new OrderStockItem(orderItem.ProductId, orderItem.Units));

        var integrationEvent = new OrderStatusChangedToPaidIntegrationEvent(
            domainEvent.OrderId,
            (eShop.IntegrationEvents.OrderStatus)order.Status,
            user.Name,
            user.Id,
            orderStockList);

        await eventPublisher.PublishAsync(integrationEvent);
    }
}
