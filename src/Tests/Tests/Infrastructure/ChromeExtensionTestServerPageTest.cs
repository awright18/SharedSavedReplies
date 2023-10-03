namespace Tests;

public class ChromeExtensionTestServerPageTest : ChromeExtensionPageTest
{
    private TestFactory _testFactory;

    public ChromeExtensionTestServerPageTest()
    {
        _testFactory = new TestFactory();
    }

    public string ServerAddress => _testFactory.ServerAddress;
}