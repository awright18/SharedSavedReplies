param([Parameter(Mandatory)]$extensionName,
      [Parameter(Mandatory)]$minverVersion,
      [Parameter(Mandatory)]$packagePath)
    
$extensionPath = "./src/ChromeExtension"

$regEx = "(?<version>\d\.\d\.\d)(\.\d)?(-[A-z]+(\.)(?<height>\d+))?"

$minverVersion -match $regEx

$version = $Matches.version

$manifest = Get-Content $extensionPath/manifest.json | ConvertFrom-Json
$manifest.version = $version
$manifest | ConvertTo-Json -Depth 32 | Set-Content $extensionPath/manifest.json

$versionedExtension = "$extensionName-$version"
$extensionZip = "$versionedExtension.zip"

New-Item -ItemType Directory -Force "extension"
Compress-Archive -Force -Path $extensionPath -Destination "$packagePath/$extensionZip"

#Check to see if this is running in GitHub Actions
if($null -ne $env:GITHUB_ENV)
{
    if(Test-Path($env:GITHUB_ENV))
    {   
        # Write the variables out to the GitHub actions environment for use in the next step
        echo "EXTENSION=$versionedExtension" | Out-File -FilePath $Env:GITHUB_ENV -Encoding utf8 
        echo "EXTENSION_ZIP=$extensionZip" | Out-File -FilePath $Env:GITHUB_ENV -Encoding utf8 
        ehco "PACKAGE_PATH=$packagePath" | Out-File -FilePath $Env:GITHUB_ENV -Encoding utf8 
    }
}

