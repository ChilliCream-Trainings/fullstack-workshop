using eShop.Ordering.Application.Common.InputModels;

namespace eShop.Ordering.Types.Inputs;

public record CreateOrderInput(
    AddressInput Address,
    PaymentMethodInput PaymentMethod,
    IReadOnlyList<OrderItemInput> Items);