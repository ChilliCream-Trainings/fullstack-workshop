# Paging in a Layered Architecture

Paging should be a business concern where the service layer should be responsible for handling the pagination. This means that the service layer should return the correct data based on the pagination arguments.

However, this necessitates a mapping between the business layer's understanding of paging and the GraphQL layer's understanding of paging. Since proper cursor-based paging can be complex and repetitive to implement in the service layer, we have introduced some utilities that have no reference to the GraphQL layer but help with the handling of paging and introduce some core types.

For this, you can add the `HotChocolate.Data.EntityFramework.Helpers` package to your service layer project.

```xml
<PackageReference Include="HotChocolate.Data.EntityFramework.Helpers" Version="14.0.0-p.93" />
```

This package introduces the `Page<T>` struct, which represents one page of the data set. It also introduces the `PagingArguments` struct that represents the paging arguments.

Apart from these core types, it also introduces extension methods for `IQueryable<T>` that allow you to apply paging to your queries.

```csharp
public async Task<Page<Brand>> GetBrandsAsync(
    PagingArguments args, 
    CancellationToken ct = default)
    => await context.Brands
        .AsNoTracking()
        .OrderBy(t => t.Name)
        .ThenBy(t => t.Id)
        .ToPageAsync(args, ct);
```

The `ToPageAsync` extension method applies the paging arguments to the query and returns a `Page<T>` struct containing the data for the current page along with some meta information.

With cursor-based paging or keyset paging, order is important. At the very least, you need to specify an order by clause on your key. The key must always be the last order instruction in your query.

The GraphQL layer itself has a type called `Connection<T>` that represents a page of data. To map the `Page<T>` struct to the `Connection<T>` type, we must add another package that handles this for us. This package belongs to your GraphQL layer and references the helpers.

```xml
<PackageReference Include="HotChocolate.Data.EntityFramework" Version="14.0.0-p.93" />
```

Now in our resolver code, we can inject the `PagingArguments` struct as an argument and map the `Page<T>` struct to the `Connection<T>` type.

```csharp
[UsePaging]
public static async Task<Connection<Brand>> GetBrandsAsync(
    PagingArguments pagingArguments,
    BrandService brandService,
    CancellationToken cancellationToken)
    => await brandService.GetBrandsAsync(pagingArguments, cancellationToken).ToConnectionAsync();
```

This approach allows us to keep the paging logic in the service layer, and the GraphQL layer can focus on GraphQL-specific concerns. The paging logic can now also be tested in isolation from the GraphQL layer.

One more thing we have to do is to tell our GraphQL configuration how to map the `PagingArguments` from the GraphQL paging arguments. For this, the package introduces a new extension method on the GraphQL configuration builder.

```csharp
services
    .AddGraphQLServer()
    ...
    .AddPagingArguments()
    ...
```
