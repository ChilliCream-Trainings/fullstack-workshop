using eShop.IntegrationEvents;
using eShop.Ordering.Application.Common.InputModels;
using eShop.Ordering.Application.Orders.Contracts;
using eShop.Ordering.Domain.AggregatesModels.OrderAggregate;
using eShop.SessionManagement;

namespace eShop.Ordering.Application.Orders.Commands.CreateOrder;

public class CreateOrderCommandHandler(
    ISession session,
    IIntegrationEventPublisher eventPublisher,
    IOrderRepository orderRepository,
    IProductByIdDataLoader productById)
    : IRequestHandler<CreateOrderCommand, int>
{
    public async Task<int> Handle(CreateOrderCommand message, CancellationToken cancellationToken)
    {
        List<Exception>? errors = null;
        var user = session.User;

        // Add Integration event to clean the basket
        await eventPublisher.PublishAsync(new OrderStartedIntegrationEvent(user.Id), cancellationToken);

        // Add/Update the Buyer AggregateRoot
        // DDD patterns comment: Add child entities and value-objects through the Order Aggregate-Root
        // methods and constructor so validations, invariants and business logic 
        // make sure that consistency is preserved across the whole aggregate
        var address = new Address(
            message.Address.Street,
            message.Address.City,
            message.Address.State,
            message.Address.Country,
            message.Address.ZipCode);

        var order = new Order(
            user.Id,
            user.Name,
            address,
            message.Payment.CardNumber,
            message.Payment.SecurityNumber,
            message.Payment.CardHolderName,
            message.Payment.CardType,
            message.Payment.Expiration);

        var products = await LoadProductInfosAsync(message.Items, cancellationToken);

        for (var i = 0; i < message.Items.Count; i++)
        {
            var item = message.Items[i];
            var product = products[i];

            if (product is null)
            {
                (errors ??= []).Add(new InvalidProductIdException(item.ProductId));
                continue;
            }

            if (product.Price != item.UnitPrice)
            {
                (errors ??= []).Add(new PriceHasChangedException(product.Id, product.Price, item.UnitPrice));
                continue;
            }

            order.AddOrderItem(
                item.ProductId,
                product.Name,
                product.Price,
                0,// TODO discount? from the UI?
                product.ImageUrl,
                item.Units);
        }

        if (errors is { Count: > 0 })
        {
            throw new AggregateException(errors);
        }

        orderRepository.AddOrder(order);
        await orderRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return order.Id;
    }

    private async Task<IReadOnlyList<ProductInfo?>> LoadProductInfosAsync(
        IReadOnlyList<OrderItemInput> items,
        CancellationToken cancellationToken)
        => await productById.LoadAsync(
            items.Select(t => t.ProductId).ToArray(),
            cancellationToken);
}