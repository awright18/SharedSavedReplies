namespace ParticularSavedReplies.Tests;

using Microsoft.Playwright;
using NUnit.Framework;
using System.Threading.Tasks;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class ExtensionTests : ChromeExtensionTestServerPageTest
{
    public ExtensionTests()
    {
        PathToExtension = Path.GetFullPath(@".\ChromeExtension");
    }

    [Test]
    [Ignore("Used for manual testing")]
    public async Task Test_Chrome_Extension_Works_On_GitHub()
    {
        var gitHubLogin = Configuration.GetGitHubLogin();
    
        var gitHubLoginUrl = "https://github.com/login";
        
        await Page.GotoAsync(gitHubLoginUrl);
        
        if (Page.Url == gitHubLoginUrl)
        {
            // Interact with login form
            await Page.GetByLabel("Username or email address")
                .FillAsync(gitHubLogin.UserName);
            await Page.GetByLabel("Password")
                .FillAsync(gitHubLogin.Password);
            await Page.GetByRole(AriaRole.Button, new() { Name = "Sign in" })
                .ClickAsync();
        }
        
        await Page.GotoAsync("https://github.com/particular/nservicebus/issues/1");
        
        await Page.Locator("#new_comment_field").FocusAsync();
        
        await Page.Keyboard.PressAsync("Control+.");

        await Page.Locator(".refresh-particular-replies").WaitForAsync(new()
        {
            // Timeout = 1000
        });

        var replies = await Page.QuerySelectorAsync("div.select-menu-list.particular-replies");
    }
    
    [Test]
    public async Task Can_add_particular_saved_replies_to_github_issue()
    {
        Page.Console += (console, msg) => Console.WriteLine(msg.Text);
        
        await Page.GotoAsync(new System.Uri(new Uri(ServerAddress), "fake-issue.html").ToString());
        
        await Page.Locator("#new_comment_field").FocusAsync();
        
        await Page.Keyboard.PressAsync("Control+.");

        var content = await Page.ContentAsync();
        
        await Page.Locator(".particular-replies").WaitForAsync(new()
        {
            Timeout = 10000
        });
        
        // var replies = await Page.QuerySelectorAsync("div.select-menu-list.particular-replies");
        //
        // await Verify(replies);
    }
}