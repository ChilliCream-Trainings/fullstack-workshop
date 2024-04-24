using System.Diagnostics;
using System.Text.Json;
using StackExchange.Redis;

namespace eShop.Basket.Services;

public sealed class RedisShoppingBasketService(
    ILogger<RedisShoppingBasketService> logger,
    IConnectionMultiplexer redis)
    : IShoppingBasketService
{
    private readonly IDatabase _database = redis.GetDatabase();

    // implementation:
    // - /backet/{id} "string" per unique basket
    private static readonly RedisKey _basketKeyPrefix = "/basket/"u8.ToArray();
    // note on UTF8 here: library limitation (to be fixed) - prefixes are more efficient as blobs

    private static RedisKey GetBasketKey(string userId) => _basketKeyPrefix.Append(userId);

    public async Task<ShoppingBasket?> GetBasketAsync(
        string customerId,
        CancellationToken ct = default)
    {
        using var data = await _database.StringGetLeaseAsync(GetBasketKey(customerId));

        if (data is null || data.Length == 0)
        {
            return null;
        }

        return JsonSerializer.Deserialize(data.Span,
            ShoppingBasketSerializationContext.Default.ShoppingBasket);
    }

    public async Task SaveBasketAsync(ShoppingBasket basket, CancellationToken ct = default)
    {
        var json = SerializeBasket(basket);
        var created = await _database.StringSetAsync(GetBasketKey(basket.CustomerId), json);

        if (!created)
        {
            logger.LogError("Problem occurred persisting basket `{0}`.", basket.CustomerId);
            return;
        }

        logger.LogInformation("Basket `{0}` persisted successfully.", basket.CustomerId);
    }

    private static byte[] SerializeBasket(ShoppingBasket basket)
    {
        using var activity = Telemetry.Source.StartActivity();
        activity?.AddTag("basket.customerId", basket.CustomerId);
        
        var json = JsonSerializer.SerializeToUtf8Bytes(basket,
            ShoppingBasketSerializationContext.Default.ShoppingBasket);
        return json;
    }

    public async Task<bool> DeleteBasketAsync(string customerId, CancellationToken ct = default)
    {
        var deleted = await _database.KeyDeleteAsync(GetBasketKey(customerId));

        if (!deleted)
        {
            logger.LogError("Problem occurred deleting basket `{0}`.", customerId);
            return false;
        }

        logger.LogInformation("Basket `{0}` deleted successfully.", customerId);

        return deleted;
    }
}
