using System.Data;
using eShop.EventBus.Abstractions;
using Npgsql;
using static eShop.IntegrationEvents.IntegrationEventsJsonTypeResolver;

namespace eShop.IntegrationEvents.EntityFramework.Postgres;

public sealed class IntegrationEventProcessor(
    IEventBus eventBus,
    IntegrationEventSignal signal)
{
    // we spin all five seconds to process events that we might have missed
    private readonly TimeSpan _pollingInterval = TimeSpan.FromSeconds(5);

    public async Task ProcessAsync(
        NpgsqlConnection connection,
        CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            var result = await ProcessEventAsync(connection, cancellationToken);
            if (!result)
            {
                await Task.WhenAny(
                    Task.Delay(_pollingInterval, cancellationToken),
                    signal.WaitAsync(cancellationToken));
            }
        }
    }

    private async Task<bool> ProcessEventAsync(
        NpgsqlConnection connection,
        CancellationToken cancellationToken)
    {
        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        try
        {
            // Lock an event for processing and increment TimesSent in case of failure
            await using var command = connection.CreateCommand();
            command.Transaction = transaction;
            command.CommandText = """
                UPDATE "IntegrationEventLogs"
                SET "TimesSent" = "TimesSent" + 1,
                     "ScheduledAt" = NOW() + INTERVAL '1 minute' * POWER(2, "TimesSent")
                WHERE "EventId" = (
                    SELECT "EventId" FROM "IntegrationEventLogs"
                    WHERE "TimesSent" < 10 AND "ScheduledAt" <= NOW()
                    ORDER BY "ScheduledAt"
                    FOR UPDATE SKIP LOCKED
                    LIMIT 1
                )
                RETURNING "EventId", "IntegrationEvent";
            """;

            try
            {
                await using var reader = await command.ExecuteReaderAsync(cancellationToken);

                if (await reader.ReadAsync(cancellationToken))
                {
                    var eventId = reader.GetGuid(nameof(IntegrationEventLogEntry.EventId));
                    var raw = reader.GetString(nameof(IntegrationEventLogEntry.IntegrationEvent));

                    var @event = JsonSerializer.Deserialize<IntegrationEvent>(raw, Options);
                    if (@event is null)
                    {
                        return false;
                    }

                    await reader.CloseAsync();

                    await eventBus.PublishAsync(@event, cancellationToken);

                    await DeleteEventAsync(connection, eventId, transaction, cancellationToken);

                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                await transaction.CommitAsync(cancellationToken);
            }
        }
        catch (Exception)
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }

    private static async Task DeleteEventAsync(
        NpgsqlConnection connection,
        Guid eventId,
        NpgsqlTransaction transaction,
        CancellationToken cancellationToken)
    {
        await using var command = connection.CreateCommand();
        command.CommandText = """
            DELETE FROM "IntegrationEventLogs"
            WHERE "EventId" = @EventId;
        """;
        command.Connection = connection;
        command.Transaction = transaction;
        command.Parameters.AddWithValue("@EventId", eventId);

        await command.ExecuteNonQueryAsync(cancellationToken);
    }
}
