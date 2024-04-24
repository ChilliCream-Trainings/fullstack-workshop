using System.Text.Json.Serialization;
using eShop.Basket.Models;

namespace eShop.Basket.Services;

[JsonSerializable(typeof(ShoppingBasket))]
[JsonSourceGenerationOptions(PropertyNameCaseInsensitive = true)]
public partial class ShoppingBasketSerializationContext : JsonSerializerContext;