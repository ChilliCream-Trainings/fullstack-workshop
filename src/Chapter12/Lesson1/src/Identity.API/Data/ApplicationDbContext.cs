namespace eShop.Identity.API.Data;

/// <remarks>
/// Add migrations using the following command inside the 'Identity.API' project directory:
///
/// dotnet ef migrations add [migration-name]
/// </remarks>
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : IdentityDbContext<User>(options);
