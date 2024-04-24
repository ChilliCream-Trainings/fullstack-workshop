namespace eShop.Identity.API.Models;

public sealed class User : IdentityUser
{
    public string Name { get; init; } = default!;

    public string LastName { get; init; } = default!;
}
