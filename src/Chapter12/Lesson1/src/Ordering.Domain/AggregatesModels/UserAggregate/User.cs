using eShop.Ordering.Domain.Common;
using eShop.Ordering.Domain.Events;

namespace eShop.Ordering.Domain.AggregatesModels.UserAggregate;

public sealed class User : Entity
{
    private readonly List<PaymentMethod> _paymentMethods;

    public User(string id, string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(id);
        ArgumentException.ThrowIfNullOrWhiteSpace(name);

        Id = id;
        Name = name;
        _paymentMethods = new List<PaymentMethod>();
    }

    public string Id { get; private set; }

    public string Name { get; private set; }
    
    public IReadOnlyList<PaymentMethod> PaymentMethods => _paymentMethods;

    public PaymentMethod VerifyOrAddPaymentMethod(
        string alias,
        string cardNumber,
        string securityNumber,
        string cardHolderName,
        CardType cardType,
        DateOnly expiration,
        int orderId)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(alias);
        ArgumentException.ThrowIfNullOrWhiteSpace(cardNumber);
        ArgumentException.ThrowIfNullOrWhiteSpace(cardHolderName);
        ArgumentException.ThrowIfNullOrWhiteSpace(cardHolderName);

        var existingPayment = _paymentMethods.SingleOrDefault(p => p.IsSameAs(cardType, cardNumber, expiration));

        if (existingPayment is not null)
        {
            Events.Add(new BuyerAndPaymentMethodVerifiedDomainEvent(this, existingPayment, orderId));
            return existingPayment;
        }

        var payment = new PaymentMethod(alias, cardNumber, securityNumber, cardHolderName, cardType, expiration);
        _paymentMethods.Add(payment);
        Events.Add(new BuyerAndPaymentMethodVerifiedDomainEvent(this, payment, orderId));
        return payment;
    }
}