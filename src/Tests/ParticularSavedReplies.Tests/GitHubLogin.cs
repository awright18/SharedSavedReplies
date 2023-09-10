using Microsoft.Extensions.Configuration;

namespace ParticularSavedReplies.Tests;

public class GitHubLogin
{
    public string UserName { get; set; }
    public string Password { get; set; }
}

public static class GitHubLoginExtension
{
    public static GitHubLogin GetGitHubLogin(this IConfiguration configuration)
    {
        var gitHubLogin = new GitHubLogin();
        configuration.GetSection("github").Bind(gitHubLogin);
        return gitHubLogin;
    }
}
    
