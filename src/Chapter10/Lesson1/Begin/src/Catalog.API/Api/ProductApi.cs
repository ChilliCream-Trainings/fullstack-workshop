using Microsoft.AspNetCore.Http.HttpResults;
using Path = System.IO.Path;

namespace eShop.Catalog.Api;

public static class ProductApi
{
    public static WebApplication AddProductApi(this WebApplication builder)
    {
        builder.MapGet("/api/products/{id:int}/img", GetItemPictureById);

        return builder;
    }

    private static async Task<Results<NotFound, PhysicalFileHttpResult>> GetItemPictureById(
        CatalogContext context,
        IWebHostEnvironment environment,
        ImageStorage images,
        int id)
    {
        var item = await context.Products.FindAsync(id);

        if (item?.ImageFileName is null)
        {
            return TypedResults.NotFound();
        }

        var path = images.GetFilePath(item.ImageFileName);

        if (path is null)
        {
            return TypedResults.NotFound();
        }

        var imageFileExtension = Path.GetExtension(item.ImageFileName);
        var mimetype = GetImageMimeTypeFromImageFileExtension(imageFileExtension);
        var lastModified = File.GetLastWriteTimeUtc(path);

        return TypedResults.PhysicalFile(path, mimetype, lastModified: lastModified);
    }

    private static string GetImageMimeTypeFromImageFileExtension(string extension)
        => extension switch
        {
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".jpg" or ".jpeg" => "image/jpeg",
            ".bmp" => "image/bmp",
            ".tiff" => "image/tiff",
            ".wmf" => "image/wmf",
            ".jp2" => "image/jp2",
            ".svg" => "image/svg+xml",
            ".webp" => "image/webp",
            _ => "application/octet-stream",
        };

    private static string GetFullPath(string contentRootPath, string pictureFileName) =>
        Path.Combine(contentRootPath, "Pics", pictureFileName);
}
