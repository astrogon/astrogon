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
    
    # Clean up tools directory
    Write-Host "Cleaning up tools directory..."
    Remove-Item -Path "tools/LICENSE", "tools/README.md" -Force -ErrorAction SilentlyContinue
    
    Write-Host "Vale installed successfully in ./tools/vale.exe"
    
    # Install Vale styles
    Write-Host ""
    Write-Host "Installing Vale styles..."
    
    # Create styles directory
    if (!(Test-Path ".vale/styles")) {
        New-Item -ItemType Directory -Path ".vale/styles" -Force
    }
    
    # Remove existing styles to ensure fresh download
    Write-Host "Removing existing styles for fresh installation..."
    Remove-Item -Path ".vale/styles/Microsoft", ".vale/styles/write-good" -Recurse -Force -ErrorAction SilentlyContinue
    
    # Download and install Microsoft style
    Write-Host "Downloading Microsoft style..."
    git clone https://github.com/errata-ai/Microsoft.git .vale/styles/Microsoft
    
    # Clean up Microsoft style directory
    Write-Host "Cleaning up Microsoft style..."
    Set-Location ".vale/styles/Microsoft"
    Remove-Item -Path ".git", ".github", ".gitignore", ".travis.yml", ".yamllint.yml", "CHANGELOG.md", "Gemfile", "LICENSE", "README.md", "features", "fixtures", "Gemfile.lock", "coverage" -Recurse -Force -ErrorAction SilentlyContinue
    Set-Location "../../../"
    
    # Download and install write-good style
    Write-Host "Downloading write-good style..."
    git clone https://github.com/errata-ai/write-good.git .vale/styles/write-good
    
    # Fix write-good structure and clean up
    Write-Host "Cleaning up write-good style..."
    Set-Location ".vale/styles/write-good"
    if (Test-Path "write-good") {
        Move-Item -Path "write-good/*" -Destination "." -Force -ErrorAction SilentlyContinue
        Remove-Item -Path "write-good" -Recurse -Force -ErrorAction SilentlyContinue
    }
    Remove-Item -Path ".git", ".gitignore", ".travis.yml", ".yamllint.yml", "CHANGELOG.md", "Gemfile", "LICENSE", "README.md", "features", "fixtures" -Recurse -Force -ErrorAction SilentlyContinue
    Set-Location "../../../"
    
    # Install mdx2vast for MDX support
    Write-Host "Installing mdx2vast for MDX format support..."
    try {
        $npmVersion = & npm --version 2>$null
        if ($npmVersion) {
            & npm install -g mdx2vast
            Write-Host "mdx2vast installed successfully"
        } else {
            throw "npm not found"
        }
    }
    catch {
        Write-Host "Warning: npm not found, skipping mdx2vast installation"
        Write-Host "Please install mdx2vast manually: npm install -g mdx2vast"
    }
    
    Write-Host ""
    Write-Host "Vale styles installed successfully:"
    Write-Host "  - Microsoft: .vale/styles/Microsoft"
    Write-Host "  - write-good: .vale/styles/write-good"
    Write-Host "  - MDX format support: mdx2vast (global npm package)"
    Write-Host "Add ./tools to your PATH or use ./tools/vale.exe directly"
    Write-Host ""
    Write-Host "Test the installation with: ./tools/vale.exe --version"
}
catch {
    Write-Error "Failed to download or extract Vale: $_"
    exit 1
}
