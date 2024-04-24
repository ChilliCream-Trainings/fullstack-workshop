using eShop.IntegrationEvents.EntityFramework.Postgres;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace eShop.Ordering.Infrastructure;

public sealed class IntegrationEventWorker(
    ILogger<IntegrationEventWorker> logger,
    NpgsqlDataSource dataSource,
    IntegrationEventProcessor eventProcessor)
    : BackgroundService
{
    /// <inheritdoc />
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await ProcessAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                logger.ErrorInIntegrationEventProcessor(ex.Message, ex);
            }
        }
    }

    private async Task ProcessAsync(CancellationToken stoppingToken)
    {
        // you may want to use a KeepAlive connection to avoid the connection being closed by a
        // firewall or a load balancer
        var connection = await dataSource.OpenConnectionAsync(stoppingToken);

        await eventProcessor.ProcessAsync(connection, stoppingToken);
    }
}

internal static partial class Logs
{
    [LoggerMessage(1, LogLevel.Information, "Error in integration event processor: {message}")]
    public static partial void ErrorInIntegrationEventProcessor(
        this ILogger logger,
        string message,
        Exception ex);
}
