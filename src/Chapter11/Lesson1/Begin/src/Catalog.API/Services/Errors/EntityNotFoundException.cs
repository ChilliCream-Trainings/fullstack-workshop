namespace eShop.Catalog.Services;

public class EntityNotFoundException(int entityId)
    : Exception($"There was no entity found with the specified id `{entityId}`.")
{
    public int EntityId { get; } = entityId;
}