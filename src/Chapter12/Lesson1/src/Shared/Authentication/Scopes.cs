// ReSharper disable MemberHidesStaticFromOuterClass

namespace eShop.Shared.Authentication;

public static class Scopes
{
    public static class Ordering
    {
        public const string Audience = "orders";

        public const string Read = $"{Audience}:read";
        public const string Write = $"{Audience}:write";

        public static readonly IReadOnlyList<string> All = [Read, Write];
    }

    public static class Basket
    {
        public const string Audience = "basket";

        public const string Read = $"{Audience}:read";
        public const string Write = $"{Audience}:write";

        public static readonly IReadOnlyList<string> All = [Read, Write];
    }

    public static class Catalog
    {
        public const string Audience = "catalog";

        public const string Read = $"{Audience}:read";
        public const string Write = $"{Audience}:write";

        public static readonly IReadOnlyList<string> All = [Read, Write];
    }

    public static readonly IReadOnlyList<string> All = [..Catalog.All, ..Basket.All, ..Ordering.All];
}
