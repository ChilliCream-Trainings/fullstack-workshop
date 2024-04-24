using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;

namespace eShop.IntegrationEvents;

public sealed class IntegrationEventsJsonTypeResolver : DefaultJsonTypeInfoResolver
{
    public static IntegrationEventsJsonTypeResolver Default { get; } = new();

    public static JsonSerializerOptions Options { get; } = new()
    {
        TypeInfoResolver = Default
    };

    public override JsonTypeInfo GetTypeInfo(Type type, JsonSerializerOptions options)
    {
        var jsonTypeInfo = base.GetTypeInfo(type, options);

        var baseEvent = typeof(IntegrationEvent);
        if (jsonTypeInfo?.Type == baseEvent)
        {
            jsonTypeInfo.PolymorphismOptions = new JsonPolymorphismOptions
            {
                IgnoreUnrecognizedTypeDiscriminators = true,
                UnknownDerivedTypeHandling = JsonUnknownDerivedTypeHandling.FailSerialization,
                DerivedTypes =
                {
                    CreateDerivedType<GracePeriodConfirmedIntegrationEvent>(),
                    CreateDerivedType<OrderPaymentFailedIntegrationEvent>(),
                    CreateDerivedType<OrderPaymentSucceededIntegrationEvent>(),
                    CreateDerivedType<OrderStartedIntegrationEvent>(),
                    CreateDerivedType<OrderStatusChangedToAwaitingValidationIntegrationEvent>(),
                    CreateDerivedType<OrderStatusChangedToCancelledIntegrationEvent>(),
                    CreateDerivedType<OrderStatusChangedToPaidIntegrationEvent>(),
                    CreateDerivedType<OrderStatusChangedToShippedIntegrationEvent>(),
                    CreateDerivedType<OrderStatusChangedToStockConfirmedIntegrationEvent>(),
                    CreateDerivedType<OrderStatusChangedToSubmittedIntegrationEvent>(),
                    CreateDerivedType<OrderStockConfirmedIntegrationEvent>(),
                    CreateDerivedType<OrderStockRejectedIntegrationEvent>()
                }
            };
        }

        return jsonTypeInfo ??
            throw new InvalidOperationException($"Unable to resolve type {type}");
    }

    private static JsonDerivedType CreateDerivedType<T>()
        => new(typeof(T), typeof(T).FullName ?? typeof(T).Name);
}
