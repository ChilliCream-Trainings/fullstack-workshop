namespace Microsoft.Extensions.Hosting;

public sealed class UserType : ObjectType<User>
{
    /// <inheritdoc />
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor.BindFieldsExplicitly();

        descriptor.Field(x => x.Name);
        descriptor.Field(x => x.LastName);
        descriptor.Field(x => x.Email);
        descriptor.Field(x => x.UserName);
        descriptor.Field(x => x.Id);
    }
}
