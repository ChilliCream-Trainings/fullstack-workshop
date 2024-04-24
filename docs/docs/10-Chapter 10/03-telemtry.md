# Telemetry

## Introdcution
With both schema registry and client registry now in place, our setup is robust. 
However, while our queries and mutations are functioning, it's likely that at some point there are still some bugs and performance issues in our application. 
This is where the importance of telemetry becomes evident.

## Preparation
Pick up right where we left off in the previous lesson or start anew with the initial setup located in the `src/Chapter10/Lesson3/Begin` folder.

## Open Telemetry
OpenTelemetry is a collection of APIs, libraries, agents, and instrumentation tools designed to enhance the observability of your application. 
HotChocolate sends telemetry data using OpenTelemetry protocols. 
To activate instrumentation in HotChocolate, you need to invoke `AddInstrumentation` on the `IRequestExecutorBuilder`.

Banana Cake Pop includes built-in OpenTelemetry support, aiding in diagnostics and understanding application behavior.

To activate OpenTelemetry, simply add the trace exporter in the service defaults (`Extensions.cs`):

```csharp
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        // left out for brevity
        tracing.AddBananaCakePopExporter();
        tracing.AddAspNetCoreInstrumentation()
            .AddHttpClientInstrumentation();
    });
```

## Custom Tracing
While HotChocolate and other libraries provide automatic instrumentation, there are scenarios where you might want to implement custom spans, such as to track execution times. For custom tracing, utilize the `ActivitySource` class from the `System.Diagnostics` namespace:

Let's imagine we have a performance issue in the `addToBasket` mutation and we need to figure out where the bottleneck is.

To create custom traces, you need to use an `ActivitySource` class from the `System.Diagnostics` namespace.

```csharp
public static class Telemetry
{
    public static ActivitySource Source { get; } = new("eShop");
}
```

We also need to configure .NET to export traces from this source. To do this, extend the tracing configuration in the `Extensions.cs` file located in `ServiceDefaults`:

```csharp
tracing.AddSource("eShop");
```

This setup allows you to start a new span in services, such as the basket service, to track the serialization time of the basket:
```csharp
using var activity = Telemetry.Source.StartActivity();
activity?.AddTag("basket.customerId", basket.CustomerId);
```

## Configure OpenTelemetry
Using OpenTelemetry comes with a performance cost. 
You should decide how much telemetry data you want to collect during runtime. 
This involves specifying which scopes to trace and which to ignore.

To see the available configurations, you can add this setup in your application:
```csharp
builder.AddInstrumentation(x =>
{
    x.RequestDetails = RequestDetails.All;
    x.Scopes = ActivityScopes.All;
});
```

## Tasks
1. Follow the instructions above to enable OpenTelemetry in your application.
2. Make a request and track it using the OpenTelemetry dashboard.