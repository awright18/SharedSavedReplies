using System.Runtime.CompilerServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using VerifyTests.Playwright;

namespace ParticularSavedReplies.Tests;

public class ChromeExtensionPageTest : BrowserTest
{
    
    private IBrowserContext context;
    
    public IPage Page { get; private set; } = null!;

    private string UserDataDirectory { get; set; } = "";
    public string PathToExtension { get; set; }
    
    private IConfiguration _config;
    
    public IConfiguration Configuration
    {
        get
        {
            if (_config == null)
            {
                var builder = new ConfigurationBuilder()
                    .AddEnvironmentVariables();
                _config = builder.Build();
            }

            return _config;
        }
    }

    [SetUp]
    public async Task PageSetup()
    {
        context = await Playwright.Chromium.LaunchPersistentContextAsync(
            UserDataDirectory,
            new()
            {
                Headless = false,
                Args = new[]
                {
                    $"--disable-extensions-except={PathToExtension}",
                    $"--load-extension={PathToExtension}"
                }
            });

        Page = await context.NewPageAsync();
    }

    [OneTimeSetUp]
    public async Task Initialize()
    {
        await SocketWaiter.Wait(port: 80);
    }

    [OneTimeTearDown]
    public async Task TearDown()
    {
        await context.DisposeAsync();
    }
}