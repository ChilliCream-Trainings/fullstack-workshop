using eShop.IntegrationEvents;
using eShop.Ordering.Infrastructure;
using Microsoft.Extensions.Options;
using OrderStatus = eShop.Ordering.Domain.AggregatesModels.OrderAggregate.OrderStatus;

namespace eShop.Ordering;
public class GracePeriodManagerService(
    IServiceProvider services, 
    IOptions<BackgroundTaskOptions> options)
    : BackgroundService
{
    private readonly BackgroundTaskOptions _options = options?.Value ?? 
        throw new ArgumentNullException(nameof(options));
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var delayTime = TimeSpan.FromSeconds(_options.CheckUpdateTime);
        var gracePeriodTime = TimeSpan.FromSeconds(_options.GracePeriodTime);

        while (!stoppingToken.IsCancellationRequested)
        {
            await ProcessOrdersAsync(gracePeriodTime, stoppingToken);
            await Task.Delay(delayTime, stoppingToken);
        }
    }

    private async Task ProcessOrdersAsync(TimeSpan gracePeriodTime, CancellationToken ct)
    {
        await using var scope = services.CreateAsyncScope();
        await using var context = scope.ServiceProvider.GetRequiredService<OrderingContext>();
        var publisher = scope.ServiceProvider.GetRequiredService<IIntegrationEventPublisher>();

        await context.Database.CreateExecutionStrategy().ExecuteAsync(
            async () =>
            {
                await using var transaction = await context.Database.BeginTransactionAsync(ct);

                var time = DateTime.UtcNow.Subtract(gracePeriodTime);
                var buffer = new GracePeriodConfirmedIntegrationEvent[10];
                var index = 0;

                await foreach (var orderId in context.Orders
                    .Where(t => t.Date <= time && t.Status == OrderStatus.Submitted)
                    .Select(t => t.Id).AsAsyncEnumerable().WithCancellation(ct))
                {
                    buffer[index++] = new GracePeriodConfirmedIntegrationEvent(orderId);

                    if (index == buffer.Length)
                    {
                        ReadOnlyMemory<GracePeriodConfirmedIntegrationEvent> events = buffer.AsMemory();
                        await publisher.PublishAsync(events, ct);
                    }
                }

                if (index > 0 && index < buffer.Length)
                {
                    ReadOnlyMemory<GracePeriodConfirmedIntegrationEvent> events = buffer.AsMemory(0, index);
                    await publisher.PublishAsync(events, ct);
                }

                await transaction.CommitAsync(ct);
            });
    }
}