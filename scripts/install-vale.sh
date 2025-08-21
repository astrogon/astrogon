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

echo "Vale installed successfully in ./tools/vale"
echo "Add ./tools to your PATH or use ./tools/vale directly"
echo ""
echo "Test the installation with: ./tools/vale --version"
