using static IdentityModel.JwtClaimTypes;

namespace eShop.Identity.API.Services;

public sealed class ProfileService(UserManager<User> userManager)
    : IProfileService
{
    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var subject = context.Subject ?? throw new ArgumentNullException(nameof(context.Subject));

        var subjectId = subject.Claims.FirstOrDefault(x => x.Type == "sub")?.Value;
        if (subjectId == null)
        {
            throw new ArgumentException("No sub claim present");
        }

        var user = await userManager.FindByIdAsync(subjectId);
        if (user == null)
        {
            throw new ArgumentException("Invalid subject identifier");
        }

        var claims = GetClaimsFromUser(user);
        context.IssuedClaims = claims.ToList();
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
        var subject = context.Subject ?? throw new ArgumentNullException(nameof(context.Subject));

        var subjectId = subject.Claims.FirstOrDefault(x => x.Type == "sub")?.Value;

        if (subjectId == null)
        {
            throw new ArgumentException("No sub claim present");
        }

        var user = await userManager.FindByIdAsync(subjectId);
        if (user == null)
        {
            context.IsActive = false;
            return;
        }

        context.IsActive = false;

        if (userManager.SupportsUserSecurityStamp)
        {
            var securityStamp = subject.Claims.Where(c => c.Type == "security_stamp")
                .Select(c => c.Value)
                .SingleOrDefault();
            if (securityStamp != null)
            {
                var dbSecurityStamp = await userManager.GetSecurityStampAsync(user);
                if (dbSecurityStamp != securityStamp)
                {
                    return;
                }
            }
        }

        context.IsActive =
            !user.LockoutEnabled ||
            !user.LockoutEnd.HasValue ||
            user.LockoutEnd <= DateTime.UtcNow;
    }

    private IEnumerable<Claim> GetClaimsFromUser(User user)
    {
        var claims = new List<Claim>
        {
            new(Subject, user.Id)
        };

        if (!string.IsNullOrWhiteSpace(user.UserName))
        {
            claims.Add(new Claim(PreferredUserName, user.UserName));
            claims.Add(new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName));
        }

        if (!string.IsNullOrWhiteSpace(user.Name))
        {
            claims.Add(new Claim("name", user.Name));
        }

        if (!string.IsNullOrWhiteSpace(user.LastName))
        {
            claims.Add(new Claim("last_name", user.LastName));
        }

        if (userManager.SupportsUserEmail)
        {
            claims.Add(new Claim(Email, user.Email!));
            claims.Add(new Claim(EmailVerified,
                user.EmailConfirmed ? "true" : "false",
                ClaimValueTypes.Boolean));
        }

        if (userManager.SupportsUserPhoneNumber && !string.IsNullOrWhiteSpace(user.PhoneNumber))
        {
            claims.Add(new Claim(PhoneNumber, user.PhoneNumber));
            claims.Add(new Claim(PhoneNumberVerified,
                user.PhoneNumberConfirmed ? "true" : "false",
                ClaimValueTypes.Boolean));
        }

        return claims;
    }
}
