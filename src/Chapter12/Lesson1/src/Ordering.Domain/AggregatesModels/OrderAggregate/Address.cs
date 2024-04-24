namespace eShop.Ordering.Domain.AggregatesModels.OrderAggregate;

public sealed record Address(
    string Street, 
    string City, 
    string State, 
    string Country, 
    string ZipCode);
