namespace eShop.Ordering.Application.Orders.Commands.SetAwaitingValidationOrderStatus;

public record SetAwaitingValidationOrderStatusCommand(int OrderId) : IRequest<bool>;
