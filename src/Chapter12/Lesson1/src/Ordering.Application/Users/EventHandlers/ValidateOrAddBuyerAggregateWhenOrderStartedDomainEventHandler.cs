using eShop.IntegrationEvents;
using eShop.Ordering.Application.Common.Contracts;
using eShop.Ordering.Application.IntegrationEvents;
using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.Ordering.Domain.Events;

namespace eShop.Ordering.Application.Users.EventHandlers;

public class ValidateOrAddBuyerAggregateWhenOrderStartedDomainEventHandler(
    IUserRepository userRepository,
    IIntegrationEventPublisher eventPublisher)
    : INotificationHandler<OrderStartedDomainEvent>
{
    public async Task Handle(OrderStartedDomainEvent domainEvent, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetUserAsync(domainEvent.UserId, cancellationToken);
        var buyerExisted = true;

        if (user is null)
        {
            user = new User(domainEvent.UserId, domainEvent.UserName);
            buyerExisted = false;
        }

        // REVIEW: The event this creates needs to be sent after SaveChanges has propagated the buyer Id.
        // It currently only works by coincidence. If we remove HiLo or if anything decides to yield earlier,
        // it will break.
        user.VerifyOrAddPaymentMethod(
            $"Payment Method on {DateTime.UtcNow}",
            domainEvent.CardNumber,
            domainEvent.CardSecurityNumber,
            domainEvent.CardHolderName,
            domainEvent.CardType,
            domainEvent.CardExpiration,
            domainEvent.Order.Id);

        if (!buyerExisted)
        {
            userRepository.AddUser(user);
        }

        await userRepository.UnitOfWork.SaveChangesAsync(cancellationToken);

        var integrationEvent = new OrderStatusChangedToSubmittedIntegrationEvent(
            domainEvent.Order.Id,
            (OrderStatus)domainEvent.Order.Status,
            user.Name,
            user.Id);
        await eventPublisher.PublishAsync(integrationEvent);
    }
}