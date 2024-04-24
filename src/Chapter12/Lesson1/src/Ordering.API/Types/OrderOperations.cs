using eShop.Ordering.Application.Common.ReadModels;
using eShop.Ordering.Application.Orders.Commands.CancelOrder;
using eShop.Ordering.Application.Orders.Commands.CreateOrder;
using eShop.Ordering.Application.Orders.Commands.SetAwaitingValidationOrderStatus;
using eShop.Ordering.Application.Orders.Queries;
using eShop.Ordering.Types.Inputs;
using MediatR;

namespace eShop.Ordering.Types;

public static class OrderOperations
{
    private static readonly Viewer _viewer = new();

    [Query]
    public static Viewer Viewer() => _viewer;

    [Query]
    [NodeResolver]
    public static Task<Order?> GetOrderByIdAsync(
        int orderId,
        [WithOrderDetails] bool withDetails,
        GetOrderQuery getOrderQuery,
        CancellationToken cancellationToken)
        => getOrderQuery.ExecuteAsync(orderId, withDetails, cancellationToken);

    [Error<PriceChangedError>]
    [Error<InvalidProductIdError>]
    [Mutation]
    public static async Task<CreateOrderPayload> CreateOrderAsync(
        CreateOrderInput input,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var command = new CreateOrderCommand(
            input.Address,
            input.PaymentMethod,
            input.Items);

        var orderId = await mediator.Send(command, cancellationToken);
        return new CreateOrderPayload(orderId);
    }

    [Mutation]
    [UseMutationConvention(PayloadFieldName = "canceledOrderId")]
    public static async Task<FieldResult<int, NoOrderFoundError>> CancelOrderAsync(
        int orderId,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var command = new CancelOrderCommand(orderId);
        var success = await mediator.Send(command, cancellationToken);
        return success
            ? orderId
            : new NoOrderFoundError(orderId);
    }

    [Mutation]
    public static async Task<FieldResult<SetAwaitingValidationStatusPayload, OrderNotFoundError>>
        SetAwaitingValidationStatusAsync(
        int orderId,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var command = new SetAwaitingValidationOrderStatusCommand(orderId);
        var success = await mediator.Send(command, cancellationToken);
        return success
            ? new SetAwaitingValidationStatusPayload(orderId)
            : new OrderNotFoundError(orderId);
    }
}
