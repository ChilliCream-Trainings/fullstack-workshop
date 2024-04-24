namespace eShop.Ordering.Application.Common.InputModels;

public record OrderItemInput(
    int ProductId,
    decimal UnitPrice,
    int Units);
