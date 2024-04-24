namespace eShop.IntegrationEvents;

public record IntegrationEvent
{
    public Guid Id { get; init; } = Guid.NewGuid();

    public DateTime CreationDate { get; init; } = DateTime.UtcNow;
}
