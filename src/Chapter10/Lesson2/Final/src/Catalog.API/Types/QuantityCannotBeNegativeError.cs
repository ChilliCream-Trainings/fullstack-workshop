namespace eShop.Catalog.Types;

public sealed record QuantityCannotBeNegativeError(int Quantity)
{
    public string Message => $"Quantity cannot be negative: {Quantity}";
}