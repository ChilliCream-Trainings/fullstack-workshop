using eShop.Ordering.Application.Common.InputModels;
using eShop.Ordering.Application.Common.ReadModels;

namespace eShop.Ordering.Types;

public sealed class OrderItemInputType : InputObjectType<OrderItemInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<OrderItemInput> descriptor)
        => descriptor.Field(t => t.ProductId).ID(nameof(Product));
}