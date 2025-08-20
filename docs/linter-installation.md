# Linter & Husky Installation

Diese Anleitung beschreibt, wie du in einem anderen Repository schnell eine minimale Husky-Integration einrichtest, die beim `pre-commit` nur eine Nachricht ausgibt. Die Schritte sind so gehalten, dass sie in einem frischen Repo reproduzierbar sind.

- [Linter \& Husky Installation](#linter--husky-installation)
  - [Pre-commit hooks via husky](#pre-commit-hooks-via-husky)
    - [Voraussetzungen](#voraussetzungen)
    - [Installation](#installation)
    - [Einfachen pre-commit hook anlegen](#einfachen-pre-commit-hook-anlegen)
    - [Testen](#testen)
    - [Wie wird der hook ausgelöst](#wie-wird-der-hook-ausgelöst)
    - [Doing nach dem clone](#doing-nach-dem-clone)

## Pre-commit hooks via husky

### Voraussetzungen
- Node.js (>=18) und npm installiert
- Git-Repository initialisiert (oder bestehendes Repo)

### Installation
   
Öffne ein Terminal im Ziel-Repo und installiere Husky als Dev-Dependency:

```bash
npm install --save-dev husky
```

`prepare`-Script in `package.json` eintragen

Füge in `package.json` unter `scripts` folgendes hinzu (falls noch nicht vorhanden):

```json
"scripts": {
  "prepare": "husky install"
}
```
Husky einmalig initialisieren (setzt `git config core.hooksPath .husky` und erstellt `.husky`). Husky-Versionen (ab v7) setzen die Git-Konfiguration `core.hooksPath` auf das Verzeichnis `.husky/` im Projekt. Git liest Hooks also nicht aus `.git/hooks`, sondern aus dem Pfad, der in `core.hooksPath` konfiguriert ist. Deshalb zeigt ein `ls .git/hooks` häufig nur die mitgelieferten `*.sample`-Dateien, obwohl Husky-Hooks unter `.husky/` aktiv sind.

```bash
npm run prepare
```

### Einfachen pre-commit hook anlegen


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

### Testen

Erzeuge eine Änderung, stage und committe:

```bash
git add .
git commit -m "test husky"
```

Beim Commit solltest du die Nachricht vom Hook in der Konsole sehen.

### Wie wird der hook ausgelöst

Prüfen, wo Git Hooks sucht:

```bash
git config --get core.hooksPath
git config --show-origin core.hooksPath
```

Prüfen, ob der Husky-Hook vorhanden und ausführbar ist:

```bash
ls -l .husky
ls -l .husky/pre-commit
cat .husky/pre-commit
```

### Doing nach dem clone

```bash
# Abhängigkeiten installieren (führt `prepare` aus, wenn es in package.json steht)
npm install

# Falls nötig Husky manuell einrichten (sollte aber durch das npm install erledigt sein)
npm run prepare
# oder
npx husky install
```
