namespace Microsoft.Extensions.Hosting;

public interface IUserService
{
    Task<User?> GetUserByIdAsync(string id, CancellationToken cancellationToken);
}
