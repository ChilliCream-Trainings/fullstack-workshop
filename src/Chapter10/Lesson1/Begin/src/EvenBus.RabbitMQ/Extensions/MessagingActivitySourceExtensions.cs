using System.Diagnostics;
using System.Text;
using OpenTelemetry;
using OpenTelemetry.Context.Propagation;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace eShop.EventBus;

internal static class MessagingActivitySourceExtensions
{
    public static Activity? StartReceivingActivity(
        this ActivitySource activitySource,
        BasicDeliverEventArgs eventArgs)
    {
        // Extract the PropagationContext of the upstream parent from the message headers.
        var parentContext = Propagators.DefaultTextMapPropagator
            .Extract(default, eventArgs.BasicProperties, ExtractTraceContextFromBasicProperties);

        Baggage.Current = parentContext.Baggage;

        // Start an activity with a name following the semantic convention of the OpenTelemetry
        // messaging specification.
        var activityName = $"{eventArgs.RoutingKey} receive";

        var activity = activitySource
            .StartActivity(activityName, ActivityKind.Client, parentContext.ActivityContext);

        activity?.SetMessagingContext(eventArgs.RoutingKey, "receive");

        return activity;
    }

    public static Activity? StartPublishingActivity(
        this ActivitySource activitySource,
        IBasicProperties properties,
        string routingKey)
    {
        // Start an activity with a name following the semantic convention of the OpenTelemetry
        // messaging specification.
        var activityName = $"{routingKey} publish";

        var activity = activitySource.StartActivity(activityName, ActivityKind.Client);

        // Depending on Sampling (and whether a listener is registered or not), the activity above
        // may not be created. If it is created, then propagate its context. If it is not created,
        // the propagate the Current context, if any.
        ActivityContext contextToInject = default;

        if (activity != null)
        {
            contextToInject = activity.Context;
        }
        else if (Activity.Current != null)
        {
            contextToInject = Activity.Current.Context;
        }

        properties.DeliveryMode = 2;

        static void InjectTraceContextIntoBasicProperties(
            IBasicProperties props,
            string key,
            string value)
        {
            props.Headers ??= new Dictionary<string, object>();
            props.Headers[key] = value;
        }

        var propagationContext = new PropagationContext(contextToInject, Baggage.Current);
        Propagators.DefaultTextMapPropagator
            .Inject(propagationContext, properties, InjectTraceContextIntoBasicProperties);

        activity?.SetMessagingContext(routingKey, "publish");

        return activity;
    }

    private static IEnumerable<string> ExtractTraceContextFromBasicProperties(
        IBasicProperties props,
        string key)
    {
        if (props.Headers.TryGetValue(key, out var value) && value is byte[] bytes)
        {
            return [Encoding.UTF8.GetString(bytes)];
        }

        return Array.Empty<string>();
    }

    private static void SetMessagingContext(
        this Activity? activity,
        string routingKey,
        string operation)
    {
        if (activity is null)
        {
            return;
        }

        // These tags are added demonstrating the semantic conventions of the OpenTelemetry
        // messaging specification
        // https://github.com/open-telemetry/semantic-conventions/blob/main/docs/messaging/messaging-spans.md
        activity.SetTag("messaging.system", "rabbitmq");
        activity.SetTag("messaging.destination_kind", "queue");
        activity.SetTag("messaging.operation", operation);
        activity.SetTag("messaging.destination.name", routingKey);
        activity.SetTag("messaging.rabbitmq.routing_key", routingKey);
    }
}
