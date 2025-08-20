# Linter & Husky Installation (reproduzierbar)

Diese Anleitung beschreibt, wie du in einem anderen Repository schnell eine minimale Husky-Integration einrichtest, die beim `pre-commit` nur eine Nachricht ausgibt. Die Schritte sind so gehalten, dass sie in einem frischen Repo reproduzierbar sind.

Voraussetzungen
- Node.js (>=18) und npm installiert
- Git-Repository initialisiert (oder bestehendes Repo)

1) Abhängigkeiten installieren

Öffne ein Terminal im Ziel-Repo und installiere Husky als Dev-Dependency:

```bash
npm install --save-dev husky
```

2) `prepare`-Script in `package.json` eintragen

Füge in `package.json` unter `scripts` folgendes hinzu (falls noch nicht vorhanden):

```json
"scripts": {
  "prepare": "husky install"
}
```

3) Husky installieren (einmalig lokal ausführen)

Führe anschließend aus:

```bash
npm run prepare
```

Dieser Befehl legt das Verzeichnis `.husky/` an und registriert Husky im Projekt.

4) Einen einfachen `pre-commit` Hook anlegen

Lege die Datei `.husky/pre-commit` mit folgendem Inhalt an:

```sh
#!/usr/bin/env sh
.
echo "Husky pre-commit hook: hello from husky!"
```

Setze die Datei ausführbar:

```bash
chmod +x .husky/pre-commit
```

5) Testen

Erzeuge eine Änderung, stage sie und committe:

```bash
git add .
git commit -m "test husky"
```

Beim Commit solltest du die Nachricht vom Hook in der Konsole sehen.

6) Optional: `lint`-Script und `husky add` verwenden

Statt die Hook-Datei manuell zu erstellen, kannst du auch `husky add` verwenden:

```bash
npx husky add .husky/pre-commit "echo \"Husky pre-commit hook: hello from husky!\""
npx husky add .husky/pre-commit "npm run lint --silent"
```

7) VS Code / CI Hinweise
- Stelle sicher, dass Editor-Extensions (ESLint, Prettier) im Ziel-Repo aktiviert sind.
- Wenn du Husky in CI-Umgebungen nutzen willst, achte darauf, dass `git` Hooks dort nicht automatisch ausgeführt werden (CI Runner können Hooks blockieren). Verwende stattdessen CI-Linter-Jobs.

Fertig — du hast jetzt eine reproduzierbare, minimale Husky-Integration, die beim `pre-commit` nur eine Nachricht ausgibt. Passe den Hook später an, um z. B. `npm run lint -- --fix` oder `prettier --check` auszuführen.
