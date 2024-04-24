using HotChocolate.AspNetCore;
using Microsoft.Extensions.Hosting.Viewer.Models;

namespace Microsoft.Extensions.Hosting;

public static class GraphQLExtensions
{
    public static void AddGraphQLServer(this IHostApplicationBuilder builder)
        => builder
            .Services
            .AddSingleton<IHttpRequestInterceptor, DefaultHttpRequestInterceptor>()
            .AddGraphQLServer()
            .AddGraphQLConventions()
            .AddHttpRequestInterceptor<SignInHttpRequestInterceptor>()
            .AddAPITypes()
            .AddUsers()
            .AddViewer();
}
