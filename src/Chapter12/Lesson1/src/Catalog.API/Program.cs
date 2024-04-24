using eShop.Catalog.Api;
using eShop.Catalog.Migrations;

var builder = WebApplication.CreateBuilder(args);

builder
    .AddDefaultAuthentication();

builder
    .AddServiceDefaults();

builder
    .AddNpgsqlDbContext<CatalogContext>(
        "CatalogDB",
        configureDbContextOptions:
        o => o.UseNpgsql(b => b.UseVector()));

builder.Services
    .AddMigration<CatalogContext, CatalogContextSeed>()
    .AddSingleton<ImageStorage>()
    .AddScoped<ProductService>()
    .AddScoped<BrandService>();

builder.Services
    .AddGraphQLServer()
    .AddGraphQLConventions()
    .AddUploadType()
    .AddTypes()
    .ModifyRequestOptions(o => o.IncludeExceptionDetails = true)
    .AddFileSystemQueryStorage("./Queries")
    .UsePersistedQueryPipeline();

var app = builder.Build();

app.MapDefaultEndpoints();
app.MapGraphQLPersistedOperations();
app.MapGraphQL();

app.AddProductApi();

app.RunWithGraphQLCommands(args);
