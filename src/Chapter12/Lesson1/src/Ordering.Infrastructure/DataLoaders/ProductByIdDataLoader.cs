using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using eShop.Ordering.Application.Orders.Contracts;
using GreenDonut;
using HotChocolate.Language;
using HotChocolate.Transport;
using HotChocolate.Transport.Http;
using HotChocolate.Types.Relay;

namespace eShop.Ordering.Infrastructure.DataLoaders;

public sealed class ProductByIdDataLoader(
    Func<HttpClient> clientFactory,
    IBatchScheduler batchScheduler,
    DataLoaderOptions options)
    : BatchDataLoader<int, ProductInfo>(batchScheduler, options)
    , IProductByIdDataLoader
{
    private static readonly Uri _productByIdUri = new("http://catalog-api/graphql/q/GetProductInfosById");

    protected override async Task<IReadOnlyDictionary<int, ProductInfo>> LoadBatchAsync(
        IReadOnlyList<int> productIds,
        CancellationToken cancellationToken)
    {
        using var client = new DefaultGraphQLHttpClient(clientFactory(), true);
        using var response = await client.SendAsync(CreateRequest(productIds), cancellationToken);
        response.EnsureSuccessStatusCode();
        using var result = await response.ReadAsResultAsync(cancellationToken);
        var products = result.Data.Deserialize(JsonContext.Default.GetProductInfosResult)!.Products;

        var map = new Dictionary<int, ProductInfo>(products.Count);

        for (var i = 0; i < products.Count; i++)
        {
            var product = products[i];

            if (product is not null)
            {
                map[productIds[i]] = new ProductInfo
                {
                    Id = productIds[i], 
                    Name = product.Name, 
                    Price = product.Price, 
                    ImageUrl = product.ImageUrl,
                };
            }
        }
        return map;
    }

    private static GraphQLHttpRequest CreateRequest(IReadOnlyList<int> keys)
    {
        var variables = new ObjectValueNode(new ObjectFieldNode("ids", EncodeIds(keys)));
        var operation = new OperationRequest(
            null, null, null, variables, 
            new ObjectValueNode(new ObjectFieldNode("works", true)));
        return new GraphQLHttpRequest(operation, _productByIdUri)
        {
            Method = GraphQLHttpMethod.Post, 
            PersistedDocumentUri = true,
        };
    }

    private static ListValueNode EncodeIds(IReadOnlyList<int> keys)
    {
        var encodedIds = new List<IValueNode>(keys.Count);

        for (var i = 0; i < keys.Count; i++)
        {
            encodedIds.Add(new StringValueNode(EncodeId(keys[i])));
        }
        return new ListValueNode(encodedIds);
    }

    private static string EncodeId(int id)
        => Convert.ToBase64String(Encoding.UTF8.GetBytes("Product:" + id));

    public record GetProductInfosResult
    {
        public required List<GetProductInfosResultProduct?> Products { get; init; }
    }
    
    public record GetProductInfosResultProduct
    {
        public required string Id { get; init; }
        public required string Name { get; init; }
        public required Uri ImageUrl { get; init; }
        public required decimal Price { get; init; }
    }
}

[JsonSerializable(typeof(ProductByIdDataLoader.GetProductInfosResult))]
[JsonSourceGenerationOptions(JsonSerializerDefaults.Web)]
internal partial class JsonContext : JsonSerializerContext;