namespace eShop.Ordering.Application.Common.InputModels;

public record AddressInput(
    string City,
    string Street,
    string State,
    string Country,
    string ZipCode);