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
        builder.AddParameterExpressionBuilder(ctx => ctx.GetGlobalStateOrDefault<UserInfo>(nameof(UserInfo)));
        return builder;
    } 
}