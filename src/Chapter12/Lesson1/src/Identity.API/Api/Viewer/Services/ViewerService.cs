using eShop.Identity.Session;

namespace Microsoft.Extensions.Hosting.Viewer.Models;

public sealed class ViewerService(
    IHttpContextAccessor httpContextAccessor,
    ISessionAccessor accessor,
    IUserByIdDataLoader userById)
    : IViewerService
{
    public async Task<User?> GetViewerAsync(CancellationToken cancellationToken)
    {
        var session = await accessor.GetSessionAsync(cancellationToken);
        if (session is null)
        {
            return null;
        }

        return await userById.LoadAsync(session.User.Id, cancellationToken);
    }

    public string? GetSessionId()
    {
        return httpContextAccessor.HttpContext?.User.Claims
            .FirstOrDefault(c => c.Type == JwtClaimTypes.SessionId)
            ?.Value;
    }
}
