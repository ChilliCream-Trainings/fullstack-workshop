using System.Buffers;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using eShop.IntegrationEvents;

namespace eShop.EventBus;

internal static class MessageSerializer
{
    [UnconditionalSuppressMessage("Trimming",
        "IL2026:RequiresUnreferencedCode",
        Justification =
            "The 'JsonSerializer.IsReflectionEnabledByDefault' feature switch, which is set to false by default for trimmed .NET apps, ensures the JsonSerializer doesn't use Reflection.")]
    [UnconditionalSuppressMessage("AOT",
        "IL3050:RequiresDynamicCode",
        Justification = "See above.")]
    public static IntegrationEvent? DeserializeMessage(
        ReadOnlyMemory<byte> message,
        Type eventType,
        JsonSerializerOptions options)
    {
        return JsonSerializer.Deserialize(message.Span, eventType, options) as IntegrationEvent;
    }

    [UnconditionalSuppressMessage("Trimming",
        "IL2026:RequiresUnreferencedCode",
        Justification =
            "The 'JsonSerializer.IsReflectionEnabledByDefault' feature switch, which is set to false by default for trimmed .NET apps, ensures the JsonSerializer doesn't use Reflection.")]
    [UnconditionalSuppressMessage("AOT",
        "IL3050:RequiresDynamicCode",
        Justification = "See above.")]
    public static void SerializeMessage(
        IBufferWriter<byte> writer,
        IntegrationEvent @event,
        JsonSerializerOptions options)
    {
        using var utf8JsonWriter = new Utf8JsonWriter(writer);
        JsonSerializer.Serialize(utf8JsonWriter, @event, @event.GetType(), options);
        utf8JsonWriter.Flush();
    }
}
