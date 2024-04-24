using HotChocolate.Diagnostics;
using HotChocolate.Execution.Configuration;

namespace Microsoft.Extensions.DependencyInjection;

public static class CustomRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddGraphQLConventions(
        this IRequestExecutorBuilder builder)
    {
        builder.AddMutationConventions();
        builder.AddPagingArguments();
        builder.AddGlobalObjectIdentification();
        builder.AddInstrumentation(x =>
        {
            x.RequestDetails = RequestDetails.All;
            x.Scopes = ActivityScopes.All;
        });
        builder.AddParameterExpressionBuilder(ctx => ctx.GetGlobalStateOrDefault<UserInfo>(nameof(UserInfo)));
        return builder;
    } 
}