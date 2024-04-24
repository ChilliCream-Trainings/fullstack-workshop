namespace Microsoft.Extensions.Hosting;

public static class UserDataLoader
{
    [DataLoader]
    public static async Task<IReadOnlyDictionary<string, User>> GetUserByIdAsync(
        IReadOnlyList<string> ids,
        ApplicationDbContext context,
        CancellationToken cancellationToken)
    {
        return await context.Users
            .Where(t => ids.Contains(t.Id))
            .ToDictionaryAsync(t => t.Id, cancellationToken);
    }
}
