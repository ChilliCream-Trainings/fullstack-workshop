namespace eShop.EventBus;

public sealed class EventBusOptions
{
    public string SubscriptionClientName { get; set; } = string.Empty;

    public int RetryCount { get; set; } = 10;
}
