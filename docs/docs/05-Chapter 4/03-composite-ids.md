# Composite IDs

In the previous lesson, we saw how to use a single field as an identifier for an entity with the Global Object Identification pattern. In this lesson, we will see how to make this work with composite IDs.

Open the lesson directory in your IDE.

```bash
code src/Chapter4/Lesson2/Begin
```

The specification itself does not specify anything in regards to composite IDs. This is because the specification is designed to be as simple as possible for the the frontend developer. For the frontend developer having to reason about which part of an entity make up the unique key to fetch it would be a burden. So, for our public interface we still want a single field that represents the identifier. The way to achieve this is to encode the composite key into a single field.

In .NET we have since version 6 something called a `record`. A `record` is a reference type that provides built-in functionality for encapsulating data, the record is immutable by default and provides value-based equality. This makes it a perfect candidate to represent a composite key. But we do not want to use a reference type for every of our identifiers. This is why there is also something called a `record struct`.

Let's say we have a class called `BookChapter` which represents a chapter in a book. The chapter is identified by the book's identifier and the chapter number. We can represent this as a `record struct`:

```csharp 
public record struct BookChapterId(int BookId, int ChapterNumber);
```

We can now use this type as an identifier for our GraphQL representation of `BookChapter`. However, our node id serializer has no idea how to serialize this type. We need to provide a custom value serializer for this type.

```csharp
public class BookChapterIdSerializer : CompositeNodeIdValueSerializer<BookChapterId>
{
    protected override NodeIdFormatterResult Format(Span<byte> buffer, BookChapterId value, out int written)
    {
        if (value == default)
        {
            written = 0;
            return NodeIdFormatterResult.InvalidValue;
        }

        if (TryFormatIdPart(buffer, value.BookId, out var bookIdWritten) &&
            TryFormatIdPart(buffer[bookIdWritten..], value.ChapterNumber, out var chapterNumberWritten))
        {
            written = bookIdWritten + chapterNumberWritten;
            return NodeIdFormatterResult.Success;
        }

        written = 0;
        return NodeIdFormatterResult.BufferTooSmall;
    }

    protected override bool TryParse(ReadOnlySpan<byte> buffer, out BookChapterId value)
    {
        if (TryParseIdPart(buffer, out int bookId, out var consumed) &&
            TryParseIdPart(buffer[consumed..], out int chapterNumber, out _))
        {
            value = new BookChapterId(bookId, chapterNumber);
            return true;
        }

        value = default;
        return false;
    }
}
```

This value serializer will plug into the node id serializer and must be registered like this:

```csharp
builder.Services
    .AddGraphQLServer()
    ...
    .AddGlobalObjectIdentification()
    .AddNodeIdValueSerializer<BookChapterIdSerializer>()
    ...
```

## Tasks

1. Implement a `record struct` that represents a composite key for a `BookChapter`.
2. Make the `BookChapter` in the lesson project a `Node` by introducing a type extension.
3. Test your implementation with Banana Cake Pop.
