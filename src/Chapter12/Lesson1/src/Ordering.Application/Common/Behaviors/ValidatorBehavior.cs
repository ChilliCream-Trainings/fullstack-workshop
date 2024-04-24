using eShop.Ordering.Domain.Exceptions;
using FluentValidation;
using FluentValidation.Results;

namespace eShop.Ordering.Application.Common.Behaviors;

public class ValidatorBehavior<TRequest, TResponse>(
    IEnumerable<IValidator<TRequest>> validators,
    ILogger<ValidatorBehavior<TRequest, TResponse>> logger)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        var typeName = request.GetGenericTypeName();

        var failures = validators
            .Select(v => v.Validate(request))
            .SelectMany(result => result.Errors)
            .Where(error => error != null)
            .ToList();

        if (failures.Count == 0)
        {
            return await next();
        }

        logger.ValidationErrors(typeName, failures);

        throw new OrderingDomainException(
            $"Command Validation Errors for type {typeof(TRequest).Name}",
            new ValidationException("Validation exception", failures));
    }
}

internal static partial class Logs
{
    [LoggerMessage(LogLevel.Warning, "Validation errors in {CommandType}")]
    public static partial void ValidationErrors(
        this ILogger logger,
        string commandType,
        [LogProperties] IEnumerable<ValidationFailure> validationErrors);
}
