namespace eShop.Identity.Session;

public interface ISessionAccessor
{
    ValueTask<ISession?> GetSessionAsync(CancellationToken cancellationToken);
}
