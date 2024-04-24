namespace eShop.SessionManagement;

public class UserInfo(string id, string name, bool isAuthenticated)
{
    public string Id { get; } = id;

    public string Name { get; } = name;

    public bool IsAuthenticated { get; } = isAuthenticated;
}