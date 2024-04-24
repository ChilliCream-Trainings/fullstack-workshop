using MediatR;

namespace eShop.Ordering.Domain.Common;

/// <summary>
/// Base class for domain events.
/// </summary>
public abstract record Event : INotification;
