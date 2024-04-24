using Microsoft.EntityFrameworkCore;

namespace Microsoft.AspNetCore.Hosting;

public interface IDbSeeder<in TContext> where TContext : DbContext
{
    Task SeedAsync(TContext context);
}
