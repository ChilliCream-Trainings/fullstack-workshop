using HotChocolate.Execution.Configuration;

namespace Microsoft.Extensions.Hosting.Viewer.Models;

public static class ViewerRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddViewer(this IRequestExecutorBuilder builder)
    {
        builder.Services.AddScoped<IViewerService, ViewerService>();

        builder.AddTypeExtension<ViewerExtensions>();

        return builder;
    }
}
