namespace eShop.Ordering.Domain.Common;

/// <summary>
/// Represents the unit of work context in which repositories operate.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    /// <summary>
    /// Saves the changes done through the repositories to the underlying data store.
    /// </summary>
    /// <param name="cancellationToken">
    /// The cancellation token.
    /// </param>
    /// <returns>
    /// A task that represents the asynchronous save operation.
    /// The task result contains a value indicating whether the save operation was successful.
    /// </returns>
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}