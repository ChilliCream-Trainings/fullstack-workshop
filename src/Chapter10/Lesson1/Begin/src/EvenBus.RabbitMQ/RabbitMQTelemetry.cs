using System.Diagnostics;
using OpenTelemetry.Context.Propagation;

namespace eShop.EventBus;

public static class RabbitMQTelemetry
{
    public static string ActivitySourceName = "EventBusRabbitMQ";

    internal static ActivitySource ActivitySource { get; } = new(ActivitySourceName);
}
