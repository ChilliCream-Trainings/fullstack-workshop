namespace eShop.SessionManagement;

public class MockSession : ISession
{
    public UserInfo User => new("user1@test.com", "user1", true);
}