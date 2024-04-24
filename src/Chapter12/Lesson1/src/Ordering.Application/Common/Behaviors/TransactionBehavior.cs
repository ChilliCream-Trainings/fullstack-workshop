using eShop.Ordering.Application.Common.Contracts;

namespace eShop.Ordering.Application.Common.Behaviors;

public class TransactionBehavior<TRequest, TResponse>(IOrderingDataContext context)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (context.HasActiveTransaction)
        {
            return await next();
        }

        var strategy = context.CreateExecutionStrategy();
        return await strategy.ExecuteAsync(
            ct => ExecuteWithTransactionAsync(context, next, ct),
            cancellationToken);
    }

    private static async Task<T> ExecuteWithTransactionAsync<T>(
        IOrderingDataContext ctx,
        RequestHandlerDelegate<T> next,
        CancellationToken ct)
    {
        await using var transaction = await ctx.BeginTransactionAsync(ct);
        var response = await next();
        await transaction.CommitAsync(ct);
        return response;
    }
}