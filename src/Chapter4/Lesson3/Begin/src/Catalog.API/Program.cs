using eShop.Catalog.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddDbContextPool<CatalogContext>(
        o => o.UseNpgsql(builder.Configuration.GetConnectionString("CatalogDB")));

builder.Services
    .AddMigration<CatalogContext, CatalogContextSeed>();

builder.Services
    .AddSingleton<ImageStorage>()
    .AddScoped<BrandService>()
    .AddScoped<ProductService>()
    .AddScoped<ProductTypeService>();

builder.Services
    .AddGraphQLServer()
    .AddCatalogTypes()
    .AddGraphQLConventions();

var app = builder.Build();

app.MapGraphQL();
app.MapProductApi();

app.RunWithGraphQLCommands(args);
