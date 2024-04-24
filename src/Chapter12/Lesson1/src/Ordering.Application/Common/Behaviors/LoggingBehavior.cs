namespace eShop.Ordering.Application.Common.Behaviors;

public class LoggingBehavior<TRequest, TResponse>(
    ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        logger.HandleCommand(request.GetGenericTypeName());

        try
        {
            var response = await next();

            logger.CommandHandled(request.GetGenericTypeName());

            return response;
        }
        catch (Exception ex)
        {
            logger.CommandFailed(request.GetGenericTypeName(), ex);
            throw;
        }
    }
}

internal static partial class Logs
{
    [LoggerMessage(LogLevel.Information, "Handling command {CommandName}")]
    public static partial void HandleCommand(this ILogger logger, string commandName);

    [LoggerMessage(LogLevel.Information, "Command {CommandName} handled")]
    public static partial void CommandHandled(this ILogger logger, string commandName);

    [LoggerMessage(LogLevel.Error, "Command {CommandName} failed")]
    public static partial void CommandFailed(this ILogger logger, string commandName, Exception ex);
}
