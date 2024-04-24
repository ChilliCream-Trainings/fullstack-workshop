using eShop.Ordering.Application.Common.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace eShop.Ordering.Infrastructure;

public sealed class OrderingDataContext(OrderingContext context, IMediator mediator) : IOrderingDataContext
{
    public bool HasActiveTransaction { get; private set; }

    public IDataExecutionStrategy CreateExecutionStrategy()
        => new DataExecutionStrategy(context.Database.CreateExecutionStrategy());

    public async Task<IDataTransaction> BeginTransactionAsync(
        CancellationToken cancellationToken = default)
    {
        if (HasActiveTransaction)
        {
            throw new InvalidOperationException("A transaction is already active");
        }

        var transaction = new DataTransaction(
            await context.Database.BeginTransactionAsync(cancellationToken),
            () => HasActiveTransaction = false);
        HasActiveTransaction = true;
        return transaction;
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await mediator.DispatchDomainEventsAsync(context, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public void Dispose()
        => context.Dispose();

    private sealed class DataTransaction(IDbContextTransaction transaction, Action complete) : IDataTransaction
    {
        public Guid Id => transaction.TransactionId;

        public async Task CommitAsync(CancellationToken cancellationToken = default)
            => await transaction.CommitAsync(cancellationToken);

        public Task RollbackAsync(CancellationToken cancellationToken = default)
            => transaction.RollbackAsync(cancellationToken);

        public async ValueTask DisposeAsync()
        {
            await transaction.DisposeAsync();
            complete();
        }
    }

    private sealed class DataExecutionStrategy(IExecutionStrategy executionStrategy) : IDataExecutionStrategy
    {
        public Task<T> ExecuteAsync<T>(
            Func<CancellationToken, Task<T>> operation,
            CancellationToken cancellationToken = default)
            => executionStrategy.ExecuteAsync(operation, cancellationToken);
    }
}