using eShop.Ordering.Application.Common.ReadModels;
using GreenDonut;

namespace eShop.Ordering.Application.Orders.Contracts;

public interface IOrdersByUserIdDataLoader : IDataLoader<OrderUserKey, Page<Order>>;