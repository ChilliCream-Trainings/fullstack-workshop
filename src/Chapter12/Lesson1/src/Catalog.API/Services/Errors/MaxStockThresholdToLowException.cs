namespace eShop.Catalog.Services;

public sealed class MaxStockThresholdToLowException(int minimumMaxStockThreshold)
    : Exception("The max stick threshold must be larger than the restock threshold.")
{
    public int MinimumMaxStockThreshold { get; } = minimumMaxStockThreshold;
}