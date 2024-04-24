namespace Microsoft.Extensions.Hosting.Viewer.Models;

[ExtendObjectType<Viewer>]
public sealed class ViewerExtensions
{
    public async Task<User?> GetUserAsync(
        [Service] IViewerService service,
        CancellationToken cancellationToken)
    {
        return await service.GetViewerAsync(cancellationToken);
    }

    public string? GetSessionId([Service] IViewerService service)
    {
        return service.GetSessionId();
    }
}
