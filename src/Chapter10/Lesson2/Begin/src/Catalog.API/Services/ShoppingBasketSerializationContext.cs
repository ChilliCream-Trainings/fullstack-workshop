using System.Text.Json.Serialization;

namespace eShop.Basket.Services;

[JsonSerializable(typeof(ShoppingBasket))]
[JsonSourceGenerationOptions(PropertyNameCaseInsensitive = true)]
public partial class ShoppingBasketSerializationContext : JsonSerializerContext;