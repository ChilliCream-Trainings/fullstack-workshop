namespace eShop.IntegrationEvents.EntityFramework.Postgres;

public sealed class IntegrationEventSignal : IDisposable, IDispatchIntegrationEvenSignal
{
    private readonly AsyncAutoResetEvent _resetEvent = new();

    public void Set()
        => _resetEvent.Set();

    public Task WaitAsync(CancellationToken cancellationToken)
        => _resetEvent.WaitAsync(cancellationToken);

    public void Dispose()
    {
        _resetEvent.Dispose();
    }
}
