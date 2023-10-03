
## Update Registry to allow self-hosted Edge extensions 
New-Item -Path HKLM:\SOFTWARE\Policies\Microsoft\Edge -Name ExtensionInstallSources -Force
New-ItemProperty -Path HKLM:\SOFTWARE\Policies\Microsoft\Edge\ExtensionInstallSources -Name "2" -Value "brown-roller-45dsfs2f457.azurestaticapps.net/*" -Force
New-Item -Path HKLM:\SOFTWARE\Policies\Microsoft\Edge -Name ExtensionInstallAllowlist -Force
New-ItemProperty -Path HKLM:\SOFTWARE\Policies\Microsoft\Edge\ExtensionInstallAllowlist -Name "1" -Value "cclehcjioikemgdocpmhpohbakhmhbbc" -Force

## Update Registry to allow self-hosted Chrome Extensions
New-Item -Path HKLM:\SOFTWARE\Policies\Google\Chrome -Name ExtensionInstallSources -Force
New-ItemProperty -Path HKLM:\SOFTWARE\Policies\Google\Chrome\ExtensionInstallSources -Name "2" -Value "brown-roller-45dsfs2f457.azurestaticapps.net/*" -Force
New-Item -Path HKLM:\SOFTWARE\Policies\Google\Chrome -Name ExtensionInstallAllowlist -Force
New-ItemProperty -Path HKLM:\SOFTWARE\Policies\Google\Chrome\ExtensionInstallAllowlist -Name "1" -Value "cclehcjioikemgdocpmhpohbakhmhbbc" -Force