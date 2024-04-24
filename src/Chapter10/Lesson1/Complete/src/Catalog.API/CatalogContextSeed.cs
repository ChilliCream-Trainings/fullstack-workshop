using System.Text.Json;
using Npgsql;
using Path = System.IO.Path;

public sealed class CatalogContextSeed(IHostEnvironment env, ImageStorage images)
    : IDbSeeder<CatalogContext>
{
    public async Task SeedAsync(CatalogContext context)
    {
        var contentRootPath = env.ContentRootPath;

        await context.Database.OpenConnectionAsync();
        await ((NpgsqlConnection) context.Database.GetDbConnection()).ReloadTypesAsync();

        if (!context.Products.Any())
        {
            var sourcePath = Path.Combine(contentRootPath, "Setup", "catalog.json");
            var sourceJson = await File.ReadAllTextAsync(sourcePath);
            var sourceItems = JsonSerializer.Deserialize<CatalogSourceEntry[]>(sourceJson);
            if (sourceItems is null)
            {
                throw new InvalidOperationException("Failed to deserialize catalog source");
            }

            context.Brands.RemoveRange(context.Brands);

            var brands = sourceItems
                .Select(x => x.Brand)
                .Distinct()
                .Select(name => new Brand { Name = name });

            await context.Brands.AddRangeAsync(brands);

            context.ProductTypes.RemoveRange(context.ProductTypes);

            var types = sourceItems.Select(x => x.Type)
                .Distinct()
                .Select(name => new ProductType { Name = name });

            await context.ProductTypes.AddRangeAsync(types);

            await context.SaveChangesAsync();

            var brandIdsByName =
                await context.Brands.ToDictionaryAsync(x => x.Name, x => x.Id);

            var typeIdsByName =
                await context.ProductTypes.ToDictionaryAsync(x => x.Name, x => x.Id);

            var products = sourceItems.Select(source => new Product()
                {
                    Id = source.Id,
                    Name = source.Name,
                    Description = source.Description,
                    Price = source.Price,
                    BrandId = brandIdsByName[source.Brand],
                    TypeId = typeIdsByName[source.Type],
                    AvailableStock = 100,
                    MaxStockThreshold = 200,
                    RestockThreshold = 10,
                    ImageFileName = $"{source.Id}.webp",
                })
                .ToArray();

            foreach (var product in products)
            {
                if (product.ImageFileName is not { } name)
                {
                    continue;
                }

                var path =
                    Path.Combine(contentRootPath, "Setup", "Pics", product.ImageFileName ?? "");

                if (!File.Exists(path))
                {
                    continue;
                }

                await using var file = File.OpenRead(path);
                product.ImageFileName =
                    await images.SaveImageAsync(name, file, CancellationToken.None);
            }

            await context.Products.AddRangeAsync(products);

            await context.SaveChangesAsync();
        }
    }

    private sealed record CatalogSourceEntry(
        int Id,
        string Type,
        string Brand,
        string Name,
        string Description,
        decimal Price);
}
