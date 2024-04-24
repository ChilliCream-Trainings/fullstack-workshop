namespace eShop.IntegrationEvents.EntityFramework.Postgres;

public sealed class IntegrationEventLogEntry
{
    public IntegrationEventLogEntry(
        Guid eventId,
        string eventTypeName,
        IntegrationEvent integrationEvent,
        int timesSent,
        DateTimeOffset creationTime,
        DateTimeOffset scheduledAt)
    {
        EventId = eventId;
        EventTypeName = eventTypeName;
        IntegrationEvent = integrationEvent;
        TimesSent = timesSent;
        CreationTime = creationTime;
        ScheduledAt = scheduledAt;
    }

    public Guid EventId { get; private set; }

    public string EventTypeName { get; private set; }

    public IntegrationEvent IntegrationEvent { get; private set; }

    public int TimesSent { get; private set; }

    public DateTimeOffset CreationTime { get; private set; }

    public DateTimeOffset ScheduledAt { get; private set; }

    public static IntegrationEventLogEntry CreateEventLogEntry<T>(T @event)
        where T : IntegrationEvent
    {
        return new IntegrationEventLogEntry(
            @event.Id,
            typeof(T).FullName ?? typeof(T).Name,
            @event,
            0,
            DateTimeOffset.UtcNow,
            DateTimeOffset.UtcNow);
    }
}
