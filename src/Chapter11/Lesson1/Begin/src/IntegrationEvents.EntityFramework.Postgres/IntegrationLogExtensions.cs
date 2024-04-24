namespace eShop.IntegrationEvents.EntityFramework.Postgres;

public static class IntegrationLogExtensions
{
    private static readonly JsonSerializerOptions _serializerOptions = new()
    {
        TypeInfoResolver = IntegrationEventsJsonTypeResolver.Default
    };

    public static void UseIntegrationEvents(this ModelBuilder builder)
        => builder.Entity<IntegrationEventLogEntry>(
            c =>
            {
                c.ToTable("IntegrationEventLogs");
                c.HasKey(e => e.EventId);
                c.Property(x => x.IntegrationEvent)
                    .HasColumnType("json")
                    .HasConversion(
                        v => JsonSerializer.Serialize(v, _serializerOptions),
                        v => JsonSerializer.Deserialize<IntegrationEvent>(v, _serializerOptions)!);
            });
}
