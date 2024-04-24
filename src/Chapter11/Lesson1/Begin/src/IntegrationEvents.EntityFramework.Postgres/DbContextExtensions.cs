namespace eShop.IntegrationEvents.EntityFramework.Postgres;

public static class DbContextExtensions
{
    public static async Task PublishEventAsync(
        this DbContext dbContext,
        IntegrationEvent @event,
        CancellationToken cancellationToken = default)
    {
        var eventLogEntry = IntegrationEventLogEntry.CreateEventLogEntry(@event);
        dbContext.Set<IntegrationEventLogEntry>().Add(eventLogEntry);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public static async Task PublishEventsAsync<T>(
        this DbContext dbContext,
        ReadOnlyMemory<T> events,
        CancellationToken cancellationToken = default)
        where T : IntegrationEvent
    {
        AddEvents(dbContext.Set<IntegrationEventLogEntry>(), events);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private static void AddEvents<T>(
        DbSet<IntegrationEventLogEntry> eventSet,
        ReadOnlyMemory<T> events)
        where T : IntegrationEvent
    {
        foreach (var @event in events.Span)
        {
            eventSet.Add(IntegrationEventLogEntry.CreateEventLogEntry(@event));
        }
    }
}