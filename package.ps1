$extensionName = "ParticularSavedReplies"
$extensionPath = "./src/ChromeExtension"

$minverVersion = $env:MINVER_VERSION

$regEx = "(?<version>\d\.\d\.\d)(\.\d)?-([A-z]+)"

$minverVersion -match $regEx

$version = $Matches.version

$manifest = Get-Content $extensionPath/manifest.json | ConvertFrom-Json
$manifest.version = $version
$manifest | ConvertTo-Json -Depth 32 | Set-Content $extensionPath/manifest.json

$versionedExtension = "$extensionName-$version"
$extensionZip = "$versionedExtension.zip"

New-Item -ItemType Directory -Force "extension"
Compress-Archive -Force -Path $extensionPath -Destination "./extension/$extensionZip"

$env:EXTENSION = $versionedExtension
$env:EXTENSION_ZIP = $extensionZip
