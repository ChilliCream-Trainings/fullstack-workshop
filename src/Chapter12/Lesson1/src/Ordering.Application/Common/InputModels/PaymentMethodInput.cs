using eShop.Ordering.Domain.AggregatesModels.UserAggregate;

namespace eShop.Ordering.Application.Common.InputModels;

public record PaymentMethodInput(
    string CardNumber,
    string SecurityNumber,
    string CardHolderName,
    CardType CardType,
    DateOnly Expiration);