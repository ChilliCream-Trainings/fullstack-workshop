using System.Collections;

namespace eShop.Ordering.Domain.Common;

/// <summary>
/// Collection of domain events
/// </summary>
public class EventCollection : IReadOnlyList<Event>
{
    private readonly List<Event> _events = [];

    /// <summary>
    /// Gets the number of domain events in the collection.
    /// </summary>
    public int Count => _events.Count;

    /// <summary>
    /// Gets the domain event at the specified index.
    /// </summary>
    /// <param name="index">
    /// The index of the event to get.
    /// </param>
    public Event this[int index] => _events[index];
    
    /// <summary>
    /// Adds a domain event to the collection.
    /// </summary>
    /// <param name="domainEvent">
    /// The domain event to add.
    /// </param>
    public void Add(Event domainEvent)
        => _events.Add(domainEvent);

    /// <summary>
    /// Removes a domain event from the collection.
    /// </summary>
    /// <param name="domainEvent">
    /// The domain event to remove.
    /// </param>
    public void Remove(Event domainEvent)
        => _events.Remove(domainEvent);

    /// <summary>
    /// Clears the collection of domain events.
    /// </summary>
    public void Clear()
        => _events.Clear();
    
    /// <summary>
    /// Gets an enumerator for the collection of domain events.
    /// </summary>
    /// <returns>
    /// An enumerator for the collection of domain events.
    /// </returns>
    public IEnumerator<Event> GetEnumerator()
        => _events.GetEnumerator();

    IEnumerator IEnumerable.GetEnumerator()
        => GetEnumerator();
}