using eShop.Ordering.Application.Common.InputModels;

namespace eShop.Ordering.Application.Orders.Commands.CreateOrder;

// DDD and CQRS patterns comment: Note that it is recommended to implement immutable Commands
// In this case, its immutability is achieved by having all the setters as private
// plus only being able to update the data just once, when creating the object through its constructor.
// References on Immutable Commands:  
// http://cqrs.nu/Faq
// https://docs.spine3.org/motivation/immutability.html 
// http://blog.gauffin.org/2012/06/griffin-container-introducing-command-support/
// https://docs.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/how-to-implement-a-lightweight-class-with-auto-implemented-properties
public record CreateOrderCommand(
    AddressInput Address, 
    PaymentMethodInput Payment,
    IReadOnlyList<OrderItemInput> Items)
    : IRequest<int>;