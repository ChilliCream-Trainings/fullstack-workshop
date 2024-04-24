using eShop.IntegrationEvents;
using MediatR.Pipeline;

namespace eShop.Ordering.Application.Common.Behaviors;

public sealed class IntegrationEventSignalPostProcessor<TRequest, TResponse>(
    IDispatchIntegrationEvenSignal signal)
    : IRequestPostProcessor<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    /// <inheritdoc />
    public Task Process(TRequest request, TResponse response, CancellationToken cancellationToken)
    {
        signal.Set();
        return Task.CompletedTask;
    }
}
