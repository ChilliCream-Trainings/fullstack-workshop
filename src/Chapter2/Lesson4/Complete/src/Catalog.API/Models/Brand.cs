// ReSharper disable CollectionNeverUpdated.Global
using System.ComponentModel.DataAnnotations;
using eShop.Catalog.Types.Configuration;

namespace eShop.Catalog.Models;

public sealed class Brand
{
    public int Id { get; set; }

    [UseToUpper]
    [Required]
    public string Name { get; set; } = default!;

    public ICollection<Product> Products { get; } = new List<Product>();
}
