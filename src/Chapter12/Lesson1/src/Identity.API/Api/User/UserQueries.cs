namespace Microsoft.Extensions.Hosting;

public static class UserQueries
{
    [NodeResolver]
    [Query]
    public static async Task<User?> GetUserByIdAsync(
        IUserService userService,
        string id,
        CancellationToken cancellationToken)
    {
        return await userService.GetUserByIdAsync(id, cancellationToken);
    }
}
