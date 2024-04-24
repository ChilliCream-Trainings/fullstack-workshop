using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Domain.AggregatesModels.UserAggregate;

/// <summary>
/// Represents the user repository contract.
/// </summary>
public interface IUserRepository : IRepository
{
    /// <summary>
    /// Get user by id
    /// </summary>
    /// <param name="id">
    /// The user id.
    /// </param>
    /// <param name="cancellationToken">
    /// The cancellation token. Default is <see cref="CancellationToken.None"/>.
    /// </param>
    /// <returns>
    /// Returns a user that matches the user id; otherwise, null.
    /// </returns>
    ValueTask<User?> GetUserAsync(string id, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Adds a new user.
    /// </summary>
    /// <param name="user">
    /// The new user to add.
    /// </param>
    /// <returns>
    /// The added user.
    /// </returns>
    void AddUser(User user);
    
    /// <summary>
    /// Updates an existing user.
    /// </summary>
    /// <param name="user">
    /// The user to update.
    /// </param>
    void UpdateUser(User user);
}

