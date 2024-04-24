using eShop.Ordering.Application.Common.ReadModels;
using eShop.Ordering.Application.Orders.Commands.CreateOrder;
using eShop.Ordering.Application.Orders.Contracts;

namespace eShop.Ordering.Types;

public sealed record PriceChangedError : IMutationError
{
    private readonly int _productId;

    public PriceChangedError([ID<Product>] int productId)
    {
        _productId = productId;
    }

    public PriceChangedError(PriceHasChangedException exception)
    {
        _productId = exception.ProductId;
    }

    public string Message => $"Price has changed for product {_productId}";

    public async Task<Product> GetProductAsync(IProductByIdDataLoader productById, CancellationToken cancellationToken)
    {
        var product = await productById.LoadAsync(_productId, cancellationToken);
        return new Product { Id = product.Id, Name = product.Name, ImageUrl = product.ImageUrl, };
    }

    public void Deconstruct(out int productId)
    {
        productId = _productId;
    }
}