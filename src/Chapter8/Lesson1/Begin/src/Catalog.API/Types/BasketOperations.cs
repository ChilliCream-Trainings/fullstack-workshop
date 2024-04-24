using eShop.Basket.Services;
using eShop.Basket.Types;
using eShop.SessionManagement;

namespace eShop.Catalog.Types;

public static class BasketOperations
{
    private static readonly Viewer _viewer = new();

    [Query]
    public static Viewer Viewer() => _viewer;
}
