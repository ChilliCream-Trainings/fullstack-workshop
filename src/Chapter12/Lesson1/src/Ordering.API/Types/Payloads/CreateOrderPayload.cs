namespace eShop.Ordering.Types;

public sealed class CreateOrderPayload(int orderId) : OrderPayloadBase(orderId);