namespace eShop.Identity.Session;

internal sealed class SessionAccessor(
    IHttpContextAccessor httpContextAccessor,
    UserManager<User> userManager) : ISessionAccessor, IAsyncDisposable
{
    private readonly SemaphoreSlim _semaphore = new(1, 1);
    private ISession? _session;
    
    public void From(SessionAccessor accessor)
    {
        _session = accessor._session;
    }

    public async ValueTask<ISession?> GetSessionAsync(CancellationToken cancellationToken)
    {
        if (_session is not null)
        {
            return _session;
        }

        // we synchronize access to the the user manager so that we never have concurrent calls
        // to the underlying db context 
        await _semaphore.WaitAsync(cancellationToken);
        try
        {
            if (_session is not null)
            {
                return _session;
            }

            var context = httpContextAccessor.HttpContext;
            if (context is null)
            {
                return null;
            }

            var user = await userManager.GetUserAsync(context.User);

            if (user is null)
            {
                return null;
            }

            _session = new DefaultSession(user);
            return _session;
        }
        catch (Exception)
        {
            return null;
        }
        finally
        {
            _semaphore.Release();
        }
    }

    private sealed record DefaultSession(User User) : ISession;

    /// <inheritdoc />
    public async ValueTask DisposeAsync()
    {
    }
}
