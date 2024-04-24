using eShop.Ordering.Domain.AggregatesModels.UserAggregate;
using eShop.Ordering.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace eShop.Ordering.Infrastructure.Repositories;

public sealed class UserRepository(OrderingContext context, IUnitOfWork unitOfWork) : IUserRepository
{
    public IUnitOfWork UnitOfWork => unitOfWork;
    
    public async ValueTask<User?> GetUserAsync(string id, CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(id, nameof(id));
        
        var user = await context.Users.FindAsync([id,], cancellationToken: cancellationToken);

        if (user is null)
        {
            return null;
        }
        
        await context.Entry(user).Collection(b => b.PaymentMethods).LoadAsync(cancellationToken);
        return user;
    }

    public void AddUser(User user)
    {
        ArgumentNullException.ThrowIfNull(nameof(user));
        ArgumentException.ThrowIfNullOrWhiteSpace(user.Id, nameof(user));
        context.Users.Add(user);
    }

    public void UpdateUser(User user)
    {
        ArgumentNullException.ThrowIfNull(nameof(user));
        ArgumentException.ThrowIfNullOrWhiteSpace(user.Id, nameof(user));
        context.Users.Update(user);
    }
}
