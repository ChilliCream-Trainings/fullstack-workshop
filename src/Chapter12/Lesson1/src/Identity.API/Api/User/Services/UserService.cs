using eShop.Identity.Session;
using GreenDonut;

namespace Microsoft.Extensions.Hosting;

internal sealed class UserService(
    IUserByIdDataLoader userById,
    ISessionAccessor accessor) : IUserService
{
    public async Task<User?> GetUserByIdAsync(
        string id,
        CancellationToken cancellationToken)
    {
        var session = await accessor.GetSessionAsync(cancellationToken);
        if (session is null)
        {
            return null;
        }

        if (session.User.Id != id)
        {
            return null;
        }

        return await userById.LoadAsync(id, cancellationToken);
    }
}
