namespace Microsoft.Extensions.Hosting.Viewer.Models;

public interface IViewerService
{
    Task<User?> GetViewerAsync(CancellationToken cancellationToken);

    string? GetSessionId();
}
