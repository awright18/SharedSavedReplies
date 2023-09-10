namespace ParticularSavedReplies.Tests;

using Microsoft.Extensions.Configuration;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;
using System.Threading.Tasks;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class GitHubTests : PageTest
{
    public override BrowserNewContextOptions ContextOptions()
    {
        return new ()
        {
            StorageStatePath = ".auth/state.json"
        };
    }
    private IConfiguration _config;
    
    public IConfiguration Configuration
    {
        get
        {
            if (_config == null)
            {
                var builder = new ConfigurationBuilder().AddJsonFile(".auth/credentials.json", optional: false);
                _config = builder.Build();
            }

            return _config;
        }
    }

    public async Task LoginToGitHub()
    {
        var gitHubLogin = Configuration.GetGitHubLogin();   
         
        // Create a Chromium browser instance
        await Page.GotoAsync("https://github.com/login");
        // Interact with login form
        await Page.GetByLabel("Username or email address")
            .FillAsync(gitHubLogin.UserName);
        await Page.GetByLabel("Password")
            .FillAsync(gitHubLogin.Password);
        await Page.GetByRole(AriaRole.Button, new() { Name = "Sign in" })
            .ClickAsync();
        
        await Page.Context.StorageStateAsync(new BrowserContextStorageStateOptions()
        {
            Path = ".auth/state.json"
        });
    }

    [Test]
    public async Task HomePage_Is_GitHub()
    {
        var gitHubLogin = Configuration.GetGitHubLogin();

        var pathToExtension = Path.GetFullPath(@".\ParticularSavedReplies");
        var browser = await Playwright.Chromium.LaunchPersistentContextAsync(
            "",
            new()
            {
                Headless = false,
                Args = new[]
                {
                    $"--disable-extensions-except={pathToExtension}",
                    $"--load-extension={pathToExtension}"
                }
            });
        
        var page = await browser.NewPageAsync();
        
        page.Console += (console, msg) => Console.WriteLine(msg.Text);
        
        await page.GotoAsync("https://github.com/login");
        // Interact with login form
        await page.GetByLabel("Username or email address")
            .FillAsync(gitHubLogin.UserName);
        await page.GetByLabel("Password")
            .FillAsync(gitHubLogin.Password);
        await page.GetByRole(AriaRole.Button, new() { Name = "Sign in" })
            .ClickAsync();
        
        await page.GotoAsync("https://github.com/particular/nservicebus/issues/1");

        await page.Locator("#new_comment_field").FocusAsync();
        
        await page.Keyboard.PressAsync("Control+.");

        await page.Locator(".refresh-particular-replies").WaitForAsync(new()
        {
            Timeout = 1000
        });

        await page.ScreenshotAsync(new PageScreenshotOptions()
        {
            Path = "login.jpg",
            FullPage = true
        });
    }
}