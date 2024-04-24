using System.Buffers;
using eShop.Ordering.Domain.Common;
using MediatR;

namespace eShop.Ordering.Infrastructure;

internal static class MediatorExtensions
{
    public static async Task DispatchDomainEventsAsync(this IMediator mediator, OrderingContext context, CancellationToken cancellationToken = default)
    {
        Entity[]? domainEntities = null;
        Event[]? domainEvents = null;
        var entitiesLength = 0;
        var eventsLength = 0;

        foreach (var entry in context.ChangeTracker.Entries<Entity>())
        {
            if (entry.Entity.Events.Count > 0)
            {
                AddElement(ref domainEntities, ref entitiesLength, entry.Entity);
                AddElements(ref domainEvents, ref eventsLength, entry.Entity.Events);
            }
        }

        if (domainEntities is null || domainEvents is null)
        {
            return;
        }

        for (var i = 0; i < entitiesLength; i++)
        {
            domainEntities[i].Events.Clear();
        }

        for (var i = 0; i < eventsLength; i++)
        {
            await mediator.Publish(domainEvents[i], cancellationToken);
        }

        domainEntities.AsSpan()[..entitiesLength].Clear();
        domainEvents.AsSpan()[..eventsLength].Clear();
        
        ArrayPool<Entity>.Shared.Return(domainEntities);
        ArrayPool<Event>.Shared.Return(domainEvents);
    }

    private static void AddElement<T>(ref T[]? buffer, ref int bufferLength, T element)
    {
        EnsureCapacity(ref buffer, bufferLength);
        buffer![bufferLength++] = element;
    }

    private static void AddElements<T>(ref T[]? buffer, ref int bufferLength, IReadOnlyCollection<T> elements)
    {
        EnsureCapacity(ref buffer, bufferLength + elements.Count);

        foreach (var element in elements)
        {
            buffer![bufferLength++] = element;
        }
    }

    private static void EnsureCapacity<T>(ref T[]? buffer, int neededCapacity)
    {
        if (buffer is null)
        {
            buffer = ArrayPool<T>.Shared.Rent(128);
            return;
        }

        if (buffer.Length >= neededCapacity)
        {
            return;
        }

        var currentCapacity = buffer.Length;
        var newCapacity = currentCapacity * 2;

        while (newCapacity < neededCapacity)
        {
            newCapacity *= 2;
        }

        var newBuffer = ArrayPool<T>.Shared.Rent(neededCapacity);
        Array.Copy(buffer, newBuffer, currentCapacity);
        ArrayPool<T>.Shared.Return(buffer);
        buffer = newBuffer;
    }
}