# Filter Customizations

The filter system in Hot Chocolate is a powerful tool that allows clients to filter data based on their needs. In this lesson, we will explore how to customize the filter system to ensure it performs well and is easy to use.

The filter system in Hot Chocolate consists of two main components: filter type generation and filter execution. Filter type generation is responsible for creating the filter input types that are used to filter data. Filter execution translates the filter input into a database provider expression that can be executed against a database.

## Filter Type Generation

The filter types not only define some structure but also the filtering capabilities that the users of your API will have. These types are generated based on the entity type you want to filter and are handled by the `FilterInputType<T>` class. This class is a generic class that takes the entity type as a type parameter.

It's important to consider what fields you want to expose for filtering. You should only expose fields that are indexed in your database. Exposing non-indexed fields will lead to performance issues.

```csharp
public sealed class ProductFilterInputType : FilterInputType<Product>
{
    protected override void Configure(IFilterInputTypeDescriptor<Product> descriptor)
    {
        descriptor.BindFieldsExplicitly();

        descriptor.Field(t => t.Name);
        descriptor.Field(t => t.Type);
        descriptor.Field(t => t.Brand);
        descriptor.Field(t => t.Price);
        descriptor.Field(t => t.AvailableStock);
    }
}
```

By introducing a filter input type for our `Product`, we can choose to either ignore fields we do not want to include using `descriptor.Ignore(t => t.Description);` or include fields by setting the type to bind fields explicitly with `descriptor.BindFieldsExplicitly();`. In our case, we opted for the latter to avoid accidentally exposing fields that we do not want to filter on.

The filter type needs to be registered with the GraphQL builder:

```csharp
services
    .AddGraphQLServer()
    ...
    .AddType<ProductFilterInputType>()
    ...
```

Or you can point to a specific input on a per field basis:

```csharp
public class Query
{
    [UseFiltering<ProductFilterInputType>]
    public IQueryable<Product> GetProducts(CatalogContext context)
        => context.Products;
}
```

Additionally, you need to consider the operations you want to allow on your exposed fields. Operations are generally defined for C# runtime types, for example, the `StringOperationFilterInputType` defines the capabilities for string filters.

```csharp
public class StringOperationFilterInputType : FilterInputType
{
    protected override void Configure(IFilterInputTypeDescriptor descriptor)
    {
        descriptor.Operation(DefaultFilterOperations.Equals).Type<StringType>();
        descriptor.Operation(DefaultFilterOperations.NotEquals).Type<StringType>();
        descriptor.Operation(DefaultFilterOperations.Contains).Type<StringType>();
        descriptor.Operation(DefaultFilterOperations.NotContains).Type<StringType>();
        descriptor.Operation(DefaultFilterOperations.In).Type<ListType<StringType>>();
        descriptor.Operation(DefaultFilterOperations.NotIn).Type<ListType<StringType>>();
        descriptor.Operation(DefaultFilterOperations.StartsWith).Type<StringType>();
        descriptor.Operation(DefaultFilterOperations.NotStartsWith).Type<StringType>();
        descriptor.Operation(DefaultFilterOperations.EndsWith).Type<StringType>();
        descriptor.Operation(DefaultFilterOperations.NotEndsWith).Type<StringType>();
    }
}
```

If we want to reduce the operations that are allowed for the `System.String` within our API, we can inherit from the `StringOperationFilterInputType` and limit the operations.

```csharp
public sealed class DefaultStringOperationFilterInputType : StringOperationFilterInputType
{
    protected override you.Configure(IFilterInputTypeDescriptor descriptor)
    {
        descriptor.Operation(DefaultFilterOperations.Equals).Type<StringType>();
        descriptor.Operation(DefaultFilterOperations.StartsWith).Type<StringType>();
    }
}
```

To use this new definition for `String`, we need to register it with the filter provider.

```csharp
services
    .AddGraphQLServer()
    ...
    .AddFiltering(
        c => c.AddDefaults()
            .BindRuntimeType<string, DefaultStringOperationFilterInputType>())
    ...
```

`BindRuntimeType` allows you to bind a runtime type to an operation filter type, enabling you to define a custom set of operations for your filterable scalar types.

:::important

Ensure that only fields that are indexed in your database are exposed. Exposing non-indexed fields can lead to performance issues.

:::

We can also override the operation type for a specific field.

```csharp
public sealed class ProductFilterInputType : FilterInputType<Product>
{
    protected override void Configure(IFilterInputTypeDescriptor<Product> descriptor)
    {
        descriptor.BindFieldsExplicitly();

        descriptor.Field(t => t.Name).Type<SearchStringOperationFilterInputType>();
        descriptor.Field(t => t.Type);
        descriptor.Field(t => t.Brand);
        descriptor.Field(t => t.Price);
        descriptor.Field(t => t.AvailableStock);
    }
}
```

## Filter Execution

We will not cover how to implement a filter expression builder in this course. However, it is often useful to know how to inspect if a filter was defined by the user and how to apply default filters if no filter was defined.

For this, we provide the `IFilterContext`, which allows you to inspect the general filter structure and determine if a filter was defined in general or for a specific field.

```csharp
[UsePaging]
[UseProjection]
[UseFiltering]
[UseSorting]
public IQueryable<Product> GetProducts(CatalogContext context, IFilterContext filterContext)
{
    filterContext.Handled(false);

    IQueryable<Product> query = context.Products;

    if (!filterContext.IsDefined)
    {
        query = query.Where(t => t.BrandId == 1);
    }

    return query;
}
```

In this example, we check if a filter was defined at all and, if not, we apply a default filter to the query.

:::note

If you want to include a where clause that ensures you only select from a certain tenant, you can do so by always applying this where clause, and we will append to this.

```csharp
[UsePaging]
[UseProjection]
[UseFiltering]
[UseSorting]
public IQueryable<Product> GetProducts(CatalogContext context, IFilterContext filterContext, [GlobalState] int tenantId)
{
    filterContext.Handled(false);

    IQueryable<Product> query = context.Products.Where(t => t.TenantId == tenantId);

    if (!filterContext.IsDefined)
    {
        query = query.Where(t => t.BrandId == 1);
    }

    return query;
}
```

:::

By default, if we inject the `IFilterContext` into our resolver, the filter middleware expects that we handle the filter ourselves. In our case, we just want to inspect and then add an additional `where` clause to our query if no filter was defined, but we want the filter middleware to still do its job. This is why we call `filterContext.Handled(false);` at the beginning of our resolver.

## Tasks

1. Think about what fields would make sense to have in our filter for our client developers.
2. Check what indexes we have in our database tables and ensure that we only expose fields that are indexed or add indexes to fields that we want to filter on.
3. Will all operations on all types that we expose be OK for our database? If not, think about how you can restrict the operations that are allowed.
