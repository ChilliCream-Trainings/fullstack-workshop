namespace Microsoft.Extensions.Hosting.Viewer.Models;

public static class ViewerOperations
{
    private static readonly Viewer _viewer = new();

    [Query]
    public static Viewer Viewer() => _viewer;
}