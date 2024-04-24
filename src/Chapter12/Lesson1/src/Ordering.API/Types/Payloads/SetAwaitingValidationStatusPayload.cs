namespace eShop.Ordering.Types;

public sealed class SetAwaitingValidationStatusPayload(int orderId) : OrderPayloadBase(orderId);