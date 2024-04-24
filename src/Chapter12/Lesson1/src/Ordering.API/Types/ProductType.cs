using eShop.Ordering.Application.Common.ReadModels;

namespace eShop.Ordering.Types;

public sealed class ProductType : ObjectType<Product>
{
    // TODO : refine hotchocolate
    protected override void Configure(IObjectTypeDescriptor<Product> descriptor)
        => descriptor.Field(t => t.Id).ID();
}