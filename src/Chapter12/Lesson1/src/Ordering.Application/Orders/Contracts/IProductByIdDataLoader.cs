using GreenDonut;

namespace eShop.Ordering.Application.Orders.Contracts;

public interface IProductByIdDataLoader : IDataLoader<int, ProductInfo>;