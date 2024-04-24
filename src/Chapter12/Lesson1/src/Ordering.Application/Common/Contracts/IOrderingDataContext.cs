using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Application.Common.Contracts;

public interface IOrderingDataContext : IUnitOfWork
{
    bool HasActiveTransaction { get; }
    
    IDataExecutionStrategy CreateExecutionStrategy();
    
    Task<IDataTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default);
}