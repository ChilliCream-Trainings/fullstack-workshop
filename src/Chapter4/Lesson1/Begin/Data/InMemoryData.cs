namespace Lesson3.Data;

public class InMemoryData
{
    public InMemoryData()
    {
        var author1 = new Author { Id = 1, Name = "J.R.R. Tolkien" };
        var author2 = new Author { Id = 2, Name = "George R.R. Martin" };

        var book1 = new Book
        {
            Id = 1,
            Title = "The Fellowship of the Ring",
            Author = author1,
        };

        var book2 = new Book
        {
            Id = 2,
            Title = "A Game of Thrones",
            Author = author2,
        };

        Books.AddRange([book1, book2]);
        Authors.AddRange([author1, author2]);
    }

    public List<Book> Books { get; } = new();

    public List<Author> Authors { get; } = new();
}