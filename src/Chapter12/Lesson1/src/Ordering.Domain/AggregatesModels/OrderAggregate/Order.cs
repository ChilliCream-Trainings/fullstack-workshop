using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.Ordering.Domain.Common;
using eShop.Ordering.Domain.Events;
using eShop.Ordering.Domain.Exceptions;

namespace eShop.Ordering.Domain.AggregatesModels.OrderAggregate;

public sealed class Order : Entity
{
    // DDD Patterns comment
    // Using a private collection field, better for DDD Aggregate's encapsulation
    // so OrderItems cannot be added from "outside the AggregateRoot" directly to the collection,
    // but only through the method OrderAggregateRoot.AddOrderItem() which includes behavior.
    private readonly List<OrderItem> _orderItems;

    private Order()
    {
        _orderItems = new List<OrderItem>();
        IsDraft = false;
    }

    public Order(
        string userId,
        string userName,
        Address address,
        string cardNumber,
        string cardSecurityNumber,
        string cardHolderName,
        CardType cardType,
        DateOnly cardExpiration,
        int? paymentMethodId = null)
        : this()
    {
        PaymentId = paymentMethodId;
        Status = OrderStatus.Submitted;
        Date = DateTime.UtcNow;
        Address = address;
        UserId = userId;

        // Add the OrderStarterDomainEvent to the domain events collection 
        // to be raised/dispatched when committing changes into the Database [ After DbContext.SaveChanges() ]
        AddOrderStartedDomainEvent(
            userId,
            userName,
            cardNumber,
            cardSecurityNumber,
            cardHolderName,
            cardType,
            cardExpiration);
    }
    
    public int Id { get; private set; }

    public DateTime Date { get; private set; }

    public Address Address { get; private set; }

    public string UserId { get; private set; }

    public OrderStatus Status { get; private set; }

    public string? Description { get; private set; }

    public IReadOnlyList<OrderItem> Items => _orderItems;

    public decimal Total { get; private set; }

    public int? PaymentId { get; private set; }

    public bool IsDraft { get; private set; }

    public static Order NewDraft()
        => new() { IsDraft = true, };

    // DDD Patterns comment
    // This Order AggregateRoot's method "AddOrderItem()" should be the only way to add Items to the Order,
    // so any behavior (discounts, etc.) and validations are controlled by the AggregateRoot 
    // in order to maintain consistency between the whole Aggregate. 
    public void AddOrderItem(
        int productId,
        string productName,
        decimal unitPrice,
        decimal discount,
        Uri productImageUrl,
        int units = 1)
    {
        var existingOrderForProduct = _orderItems.SingleOrDefault(o => o.ProductId == productId);

        if (existingOrderForProduct is not null)
        {
            // if previous line exist modify it with higher discount and units..
            if (discount > existingOrderForProduct.Discount)
            {
                existingOrderForProduct.SetNewDiscount(discount);
            }

            existingOrderForProduct.AddUnits(units);
            Total = _orderItems.Sum(o => o.Units * o.UnitPrice);
        }
        else
        {
            //add validated new order item
            var orderItem = new OrderItem(productId, productName, unitPrice, discount, productImageUrl, units);
            _orderItems.Add(orderItem);
            Total += orderItem.Units * orderItem.UnitPrice;
        }
    }

    public void SetPaymentMethodVerified(string userId, int paymentId)
    {
        UserId = userId;
        PaymentId = paymentId;
    }

    public void SetAwaitingValidationStatus()
    {
        if (Status == OrderStatus.Submitted)
        {
            Events.Add(new OrderStatusChangedToAwaitingValidationDomainEvent(Id, _orderItems));
            Status = OrderStatus.AwaitingValidation;
        }
    }

    public void SetStockConfirmedStatus()
    {
        if (Status == OrderStatus.AwaitingValidation)
        {
            Events.Add(new OrderStatusChangedToStockConfirmedDomainEvent(Id));
            Status = OrderStatus.StockConfirmed;
            Description = "All the items were confirmed with available stock.";
        }
    }

    public void SetPaidStatus()
    {
        if (Status == OrderStatus.StockConfirmed)
        {
            Events.Add(new OrderStatusChangedToPaidDomainEvent(Id, Items));
            Status = OrderStatus.Paid;
            Description = "The payment was performed at a simulated " +
                "\"American Bank checking bank account ending on XX35071\"";
        }
    }

    public void SetShippedStatus()
    {
        if (Status != OrderStatus.Paid)
        {
            StatusChangeException(OrderStatus.Shipped);
        }

        Status = OrderStatus.Shipped;
        Description = "The order was shipped.";
        Events.Add(new OrderShippedDomainEvent(this));
    }

    public void SetCancelledStatus()
    {
        if (Status == OrderStatus.Paid ||
            Status == OrderStatus.Shipped)
        {
            StatusChangeException(OrderStatus.Cancelled);
        }

        Status = OrderStatus.Cancelled;
        Description = $"The order was cancelled.";
        Events.Add(new OrderCancelledDomainEvent(this));
    }

    public void SetCancelledStatusWhenStockIsRejected(IEnumerable<int> orderStockRejectedItems)
    {
        if (Status == OrderStatus.AwaitingValidation)
        {
            Status = OrderStatus.Cancelled;

            var itemsStockRejectedProductNames = Items
                .Where(c => orderStockRejectedItems.Contains(c.ProductId))
                .Select(c => c.ProductName);

            var itemsStockRejectedDescription = string.Join(", ", itemsStockRejectedProductNames);
            Description = $"The product items don't have stock: ({itemsStockRejectedDescription}).";
        }
    }

    private void AddOrderStartedDomainEvent(
        string userId,
        string userName,
        string cardNumber,
        string cardSecurityNumber,
        string cardHolderName,
        CardType cardType,
        DateOnly cardExpiration)
    {
        var orderStartedDomainEvent = new OrderStartedDomainEvent(
            this,
            userId,
            userName,
            cardNumber,
            cardSecurityNumber,
            cardHolderName,
            cardType,
            cardExpiration);

        Events.Add(orderStartedDomainEvent);
    }

    private void StatusChangeException(OrderStatus orderStatusToChange)
    {
        throw new OrderingDomainException(
            $"Is not possible to change the order status from {Status} to {orderStatusToChange}.");
    }
}