using System.Runtime.CompilerServices;

namespace ParticularSavedReplies.Tests;

public class ModuleInitializer
{
    [ModuleInitializer]
    public static void InitPlaywright() =>
        VerifyPlaywright.Initialize();

    [ModuleInitializer]
    public static void InitVerifier() => Verifier.UseProjectRelativeDirectory("approvals");
    
}