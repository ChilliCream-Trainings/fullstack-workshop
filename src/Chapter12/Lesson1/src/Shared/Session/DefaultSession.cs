using eShop.SessionManagement;

namespace eShop.Shared.Session;

public sealed class DefaultSession : ISession
{
    public UserInfo User { get; set; }

    public void From(DefaultSession accessor)
    {
        User = accessor.User;
    }
}
