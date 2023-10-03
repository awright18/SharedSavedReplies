namespace Tests;

using Microsoft.Playwright;
using NUnit.Framework;
using System.Threading.Tasks;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class ExtensionTests : ChromeExtensionTestServerPageTest
{
    private string _chromeExtensionUrl;
    private string _addSavedRepliesFormUrl; 
    
    public ExtensionTests()
    {
        PathToExtension = Path.GetFullPath(@"./ChromeExtension");
    }

    public async Task AddFakeSavedReplies(IPage page)
    {
            new Uri(new Uri())
    }

    [Test]
    public async Task Can_add_saved_replies_to_github_issue()
    {
        Page.Console += (console, msg) => Console.WriteLine(msg.Text);
        
        Page.PageError += (sender, error) => Console.WriteLine(error);
        
        Console.WriteLine($"ServerAddress:{ServerAddress}");

        var fakeIssueUrl = new System.Uri(new Uri(ServerAddress), "fake-issue.html").ToString();
        
        await Page.GotoAsync(fakeIssueUrl);
        
        Console.WriteLine($"FakeIssueUrl:{fakeIssueUrl}");
        
        await Page.Locator("#saved-reply-new_comment_field").FocusAsync();

        await Page.Keyboard.PressAsync(".");

        await Page.Locator(".saved-replies").WaitForAsync(new()
        {
            Timeout = 500
        });
    }
}