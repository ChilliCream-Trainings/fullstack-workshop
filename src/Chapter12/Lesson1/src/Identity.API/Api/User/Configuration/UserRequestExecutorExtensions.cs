using HotChocolate.Execution.Configuration;

namespace Microsoft.Extensions.Hosting;

public static class UserRequestExecutorExtensions
{
    public static IRequestExecutorBuilder AddUsers(this IRequestExecutorBuilder builder)
    {
        builder.Services.AddScoped<IUserService, UserService>();

        builder.AddType<UserType>();

        return builder;
    }
}
