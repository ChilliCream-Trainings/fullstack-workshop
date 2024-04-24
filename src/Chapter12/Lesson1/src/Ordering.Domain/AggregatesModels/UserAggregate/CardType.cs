using System.Text.Json.Serialization;

namespace eShop.Ordering.Domain.AggregatesModels.UserAggregate;

/// <remarks> 
/// Card type class should be marked as abstract with protected constructor to encapsulate known enum types
/// this is currently not possible as OrderingContextSeed uses this constructor to load cardTypes from csv file
/// </remarks>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum CardType
{
    Amex = 1,
    Visa = 2,
    MasterCard = 3,
}
