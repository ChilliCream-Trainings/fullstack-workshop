using eShop.Ordering.Application.Common.ReadModels;
using GreenDonut;

namespace eShop.Ordering.Application.Orders.Contracts;

public interface IOrderByIdDataLoader : IDataLoader<OrderKey, Order>;