using HotChocolate.AspNetCore;
using HotChocolate.Execution;

namespace Microsoft.Extensions.Hosting;

public sealed class SignInHttpRequestInterceptor : DefaultHttpRequestInterceptor
{
    /// <inheritdoc />
    public override async ValueTask OnCreateAsync(
        HttpContext context,
        IRequestExecutor requestExecutor,
        IQueryRequestBuilder requestBuilder,
        CancellationToken cancellationToken)
    {
        var auth = await context
            .AuthenticateAsync(IdentityServerConstants.LocalApi.AuthenticationScheme);

        if (auth is { Succeeded: true, Principal: { } principal })
        {
            var userState = new UserState(principal);
            requestBuilder.AddGlobalState(nameof(ClaimsPrincipal), principal);
            requestBuilder.AddGlobalState(WellKnownContextData.UserState, userState);
        }

        context.User = auth.Principal ?? context.User;

        await base.OnCreateAsync(context, requestExecutor, requestBuilder, cancellationToken);
    }
}
