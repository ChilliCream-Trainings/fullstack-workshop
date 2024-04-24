namespace eShop.Ordering.Domain.Common;

/// <summary>
/// Base class for entities
/// </summary>
public abstract class Entity
{
    public EventCollection Events { get; } = [];
}