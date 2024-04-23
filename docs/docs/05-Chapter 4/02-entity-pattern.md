# Entity Pattern

The global object identification pattern describes what an entity is and how an entity can be fetched by its globally unique identifier. This pattern is a fundamental building block for any GraphQL server that wants to be compatible with the Relay specification. There are a couple of parts to this specification. The first thing is that any entity must implement the `Node` interface. The `Node` interface is a simple interface that has a single field called `id` that returns a non-null `ID`. This `id` should be a globally unique identifier for the object, meaning it must have a unique identifier within your schema. Given this `id`, the server should be able to refetch the object through the `node` root field. The `node` root field provides a generic way for clients to refetch parts of an entity by its globally unique identifier.

Open the lesson directory in your IDE.

```bash
code src/Chapter4/Lesson1/Begin
```

In **Hot Chocolate** we have made it very easy to implement the global object identification pattern.

```csharp
builder.Services
    .AddGraphQLServer()
    ...
    .AddGlobalObjectIdentification()
    ...
```

By opting in **Hot Chocolate** will demand at least one implementation of the `Node` interface and make sure that all entities have unique identifiers. To make sure that every `ID` is unique within your schema, **Hot Chocolate** will encode the original ID with the type name.

:::note

In order to provide your own `ID` encoding, you can implement the `INodeIdSerializer` interface and register it with GraphQL configuration builder.

```csharp
builder.Services
    .AddGraphQLServer()
    ...
    .AddGlobalObjectIdentification()
    .AddNodeIdSerializer<MyNodeIdSerializer>()
    ...
```

:::

There are two ways to specify an entity and this depends largely on your domain model. The first way is if you alread have a `entityById` field on your query type. If you remeber, we already have for instance a field `productById` to fetch the product by its primary key.

```csharp
[QueryType]
public static class ProductQueries
{
    public static async Task<Product?> GetProductByIdAsync(
        int id,
        ProductService productService,
        CancellationToken cancellationToken)
        => await productService.GetProductByIdAsync(id, cancellationToken);
}
```

In this case we can simply annotate this field with the `NodeResolver` attribute.

```csharp
[QueryType]
public static class ProductQueries
{
    [NodeResolver]
    public static async Task<Product?> GetProductByIdAsync(
        int id,
        ProductService productService,
        CancellationToken cancellationToken)
        => await productService.GetProductByIdAsync(id, cancellationToken);
}
```

Since if there is a node resolver for an object the returning object must be an entity. **Hot Chocolate** will implicitly implement the interface and ensure that the `id` field is encoded.

The second way is to specify this on the entity itself with a type extension. This is useful if you have more complex identifiers like a composite key or if you do not want to have a public `entityById` field on the query type for this entity but you still want it to be refetchable.

```csharp
[ObjectType<BookChapter>]
public static partial class BookChapterNode
{
    [NodeResolver]
    public static BookChapter? GetChapterById(BookChapterId id, BookChapterRepository repository)
        => repository.GetBookChapterById(id.BookId, id.ChapterNumber);
}
```

## Tasks

1. Add the global object identification spec to the lesson project.
2. Make `Book` a `Node` by reusing the query field to fetch a book by its identifier.
3. Make `Author` a `Node` by introducing a type extension.
4. Run the server and grab a book identifier and try to fetch the book title through the `node` field.
