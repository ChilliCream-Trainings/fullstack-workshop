# Type Extensions

With the annotation-based approach, **Hot Chocolate** infers the GraphQL schema from your .NET code. This is great as it reduces the amount of declarations you have to write. But sometimes you want to add additional fields or remove parts of the type. This is where type extensions come into play.

The main type for which we use these are `ObjectTypes`. In order to extend an object type, we create a separate static partial class. The class must be partial as the Hot Chocolate source generator will inject code to merge the GraphQL definitions.

```csharp
[ObjectType(ProductType)]
public static partial class ProductTypeNode
{
    [UsePaging]
    public static Task<Connection<Product>> GetProductsAsync(
        [Parent] ProductType productType,
        PagingArguments pagingArguments,
        ProductService productService,
        CancellationToken cancellationToken)
        => productService.GetProductsByTypeAsync(productType.Id, pagingArguments, cancellationToken).ToConnectionAsync();
}
```

In Hot Chocolate 14, we can now hook into the configuration API from the type extension by implementing the partial method `Configure` on the type extension.

```csharp
[ObjectType(Product)]
public static partial class ProductNode
{
    static partial void Configure(IObjectTypeDescriptor<Product> descriptor)
    {
        descriptor
            .Ignore(t => t.BrandId)
            .Ignore(t => t.TypeId)
            .Ignore(t => t.AddStock(default))
            .Ignore(t => t.RemoveStock(default));
    }
}
```

This allows for more complex operations to get a handle on the underlying descriptor API and still keep using the annotation-based approach.
