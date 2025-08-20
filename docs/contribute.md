# Contribute

Feel free to contrubite with you own pull request to the frickeldave website. This contribution guide describe how to do that. 

## 🎈 Prepare WSL

I recommend to use a WSL with debian to setup the development environment.

```powershell
wsl --install debian --name frickeldave
...
...
wsl -d frickeldave
```

## 🪄 Configure your WSL

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

## 🧞 Commands (by Astro)

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


## 🧾 See Also

[Astro Documentation](https://docs.astro.build) - The official documentation for Astro. If there's an Astro topic you're confused about, you can probably find a consise and clear explanation here.

The [customization guideline from astrogon](https://github.com/astrogon/astrogon/blob/main/docs/customization.md) describes how to customize the theme. 

See [Teckstack](https://github.com/astrogon/astrogon/blob/main/docs/tech-stack.md) for more details.

## 🔧 Git hooks & Husky

Dieses Projekt verwendet Husky, um Git-Hooks (z. B. `pre-commit`) aus dem Verzeichnis `.husky/` zu verwalten. Nach dem Klonen des Repos sollten Mitwirkende die Hooks einmalig aktivieren:

```bash
# Installiert Abhängigkeiten und führt das `prepare`-Script aus, das Husky installiert
npm install

# Falls nötig, Husky manuell einrichten
npm run prepare
# oder
npx husky install
```

Wichtig: Wenn `npm install` mit `--ignore-scripts` ausgeführt wird oder Lifecycle-Scripts deaktiviert sind, wird das `prepare`-Script nicht ausgeführt und die Hooks werden nicht eingerichtet. In CI solltest du Hooks nicht als Ersatz für CI-Linter-Jobs verwenden; dort sollten Linter/Formatter explizit als separate Schritte ausgeführt werden.