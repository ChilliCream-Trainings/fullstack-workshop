using System.Reflection;
using HotChocolate.Execution.Configuration;
using HotChocolate.Internal;
using HotChocolate.Resolvers;

namespace Microsoft.Extensions.DependencyInjection;

public static class CustomRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddGraphQLConventions(
        this IRequestExecutorBuilder builder)
    {
        builder.AddMutationConventions();
        builder.AddPagingArguments();
        builder.AddGlobalObjectIdentification();
        builder.AddInstrumentation();
        builder.AddParameterExpressionBuilder(
            ctx => ctx.GetGlobalStateOrDefault<UserInfo>(nameof(UserInfo)));
        builder.Services.AddSingleton<IParameterBindingFactory, ParameterBindingFactory>();
        return builder;
    }

    private class ParameterBindingFactory 
        : ParameterBinding
        , IParameterBindingFactory
        
    {
        public bool CanHandle(ParameterInfo parameter)
            => parameter.ParameterType == typeof(UserInfo);

        public IParameterBinding Create(ParameterBindingContext context) 
            => this;

        public override T Execute<T>(IPureResolverContext context) 
            => (T)(object)context.GetGlobalState<UserInfo>(nameof(UserInfo));
    }
}