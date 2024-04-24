namespace eShop.Ordering.Application.Common.ReadModels;

public record Order
{
    public required int Id { get; init; }
    public required string UserId { get; init; }
    public required DateTime Date { get; init; }
    public required OrderStatus Status { get; init; }
    public string? Description { get; init; }
    public Address? Address { get; init; }
    public IReadOnlyList<OrderItem>? Items { get; init; }
    public decimal Total { get; init; }
}