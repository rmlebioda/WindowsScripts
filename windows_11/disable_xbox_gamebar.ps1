Get-AppxPackage Microsoft.XboxGamingOverlay -AllUsers | Remove-AppxPackage
cmd -c winget uninstall "xbox game bar"
cmd -c winget uninstall "xbox game bar plugin"