param(
    [string]$ValeVersion = "3.7.1"
)

$ErrorActionPreference = "Stop"

# Detect architecture
$arch = if ([Environment]::Is64BitOperatingSystem) { "64-bit" } else { "32-bit" }
$binaryName = "vale_${ValeVersion}_Windows_${arch}.zip"

# Create tools directory
if (!(Test-Path "tools")) {
    New-Item -ItemType Directory -Path "tools"
}

# Download Vale
Write-Host "Downloading Vale $ValeVersion for Windows $arch..."
$downloadUrl = "https://github.com/errata-ai/vale/releases/download/v$ValeVersion/$binaryName"
$zipPath = "tools/vale.zip"

try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath
    
    # Extract Vale
    Expand-Archive -Path $zipPath -DestinationPath "tools" -Force
    Remove-Item $zipPath
    
    Write-Host "Vale installed successfully in ./tools/vale.exe"
    Write-Host "Add ./tools to your PATH or use ./tools/vale.exe directly"
    Write-Host ""
    Write-Host "Test the installation with: ./tools/vale.exe --version"
}
catch {
    Write-Error "Failed to download or extract Vale: $_"
    exit 1
}
