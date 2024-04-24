using eShop.Ordering.Domain.Common;

namespace eShop.Ordering.Domain.AggregatesModels.UserAggregate;

public sealed class PaymentMethod : Entity
{
    public PaymentMethod(
        string alias,
        string cardNumber,
        string securityNumber,
        string cardHolderName,
        CardType cardType,
        DateOnly expiration)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(alias);
        ArgumentException.ThrowIfNullOrWhiteSpace(cardNumber);
        ArgumentException.ThrowIfNullOrWhiteSpace(securityNumber);
        ArgumentException.ThrowIfNullOrWhiteSpace(cardHolderName);
        
        if (expiration < DateOnly.FromDateTime(DateTime.UtcNow))
        {
            throw new ArgumentOutOfRangeException(
                nameof(expiration),
                expiration,
                "Card expiration cannot be in the past");
        }

        Alias = alias;
        CardNumber = cardNumber;
        SecurityNumber = securityNumber;
        CardHolderName = cardHolderName;
        CardType = cardType;
        Expiration = expiration;
    }
    
    public int Id { get; private set; }
    
    public string Alias { get; private set; }
    
    public string CardNumber { get; private set; }

    public string SecurityNumber { get; private set; }
    
    public string CardHolderName { get; private set; }

    public DateOnly Expiration { get; private set; }

    public CardType CardType { get; private set; }

    public bool IsSameAs(CardType cardType, string cardNumber, DateOnly expiration)
        => CardType == cardType && CardNumber == cardNumber && Expiration == expiration;
}
