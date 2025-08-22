#!/bin/bash
set -e

# Vale Version
VALE_VERSION="3.7.1"
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

# Architecture mapping
case $ARCH in
  x86_64) ARCH="64-bit" ;;
  arm64|aarch64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

# OS specific settings
case $OS in
  linux)
    BINARY_NAME="vale_${VALE_VERSION}_Linux_${ARCH}.tar.gz"
    ;;
  darwin)
    BINARY_NAME="vale_${VALE_VERSION}_macOS_${ARCH}.tar.gz"
    ;;
  *)
    echo "Unsupported OS: $OS"
    echo "Please use the PowerShell script for Windows: scripts/install-vale.ps1"
    exit 1
    ;;
esac

# Create tools directory
mkdir -p ./tools

# Download and extract Vale
echo "Downloading Vale ${VALE_VERSION} for ${OS} ${ARCH}..."
curl -L "https://github.com/errata-ai/vale/releases/download/v${VALE_VERSION}/${BINARY_NAME}" | tar -xz -C ./tools

# Make executable
chmod +x ./tools/vale

# Clean up tools directory
echo "Cleaning up tools directory..."
rm -f ./tools/LICENSE ./tools/README.md 2>/dev/null || true

echo "Vale installed successfully in ./tools/vale"

# Install Vale styles
echo ""
echo "Installing Vale styles..."

# Create styles directory
mkdir -p ./.vale/styles

# Remove existing styles to ensure fresh download
echo "Removing existing styles for fresh installation..."
rm -rf ./.vale/styles/Microsoft ./.vale/styles/write-good 2>/dev/null || true

# Download and install Microsoft style
echo "Downloading Microsoft style..."
git clone https://github.com/errata-ai/Microsoft.git ./.vale/styles/Microsoft

# Clean up Microsoft style directory
echo "Cleaning up Microsoft style..."
cd ./.vale/styles/Microsoft
rm -rf .git .github .gitignore .travis.yml .yamllint.yml CHANGELOG.md Gemfile LICENSE README.md features fixtures Gemfile.lock coverage 2>/dev/null || true
cd ../../../

# Download and install write-good style
echo "Downloading write-good style..."
git clone https://github.com/errata-ai/write-good.git ./.vale/styles/write-good

# Fix write-good structure and clean up
echo "Cleaning up write-good style..."
cd ./.vale/styles/write-good
if [ -d "write-good" ]; then
    mv write-good/* . 2>/dev/null || true
    rmdir write-good 2>/dev/null || true
fi
rm -rf .git .gitignore .travis.yml .yamllint.yml CHANGELOG.md Gemfile LICENSE README.md features fixtures 2>/dev/null || true
cd ../../../

# Install mdx2vast for MDX support
echo "Installing mdx2vast for MDX format support..."
if command -v npm >/dev/null 2>&1; then
    npm install -g mdx2vast
    echo "mdx2vast installed successfully"
else
    echo "Warning: npm not found, skipping mdx2vast installation"
    echo "Please install mdx2vast manually: npm install -g mdx2vast"
fi

echo ""
echo "Vale styles installed successfully:"
echo "  - Microsoft: ./.vale/styles/Microsoft"
echo "  - write-good: ./.vale/styles/write-good"
echo "  - MDX format support: mdx2vast (global npm package)"
echo "Add ./tools to your PATH or use ./tools/vale directly"
echo ""
echo "Test the installation with: ./tools/vale --version"
