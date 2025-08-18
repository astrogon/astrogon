# Contribute

## Prepare WSL

```powershell
wsl --install debian --name frickeldave
...
...
wsl -d frickeldave
```

## Configure your WSL

```bash

# This is step 1

# Install git
sudo apt install git -y
# Install curl
sudo apt install curl -y
# Install nvm
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Install 
nvm install --lts
```

```bash

# This is step 2 - After installing nvm, open a new shell

# Install node
nvm install --lts

# Clone repo
cd ~
mkdir dev
cd dev
git clone https://github.com/Frickeldave/frickeldave-main.git
cd frickeldave-main
git config user.name "<YOURNAME>"
git config user.email "<YOURMAILADDRESS>"

```