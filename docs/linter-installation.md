# Linter Installation und Integration über Husky

Diese Anleitung beschreibt, wie du in einem Astro/Starlight Repository alle notwendigen Linter einbaust. 

- [Linter Installation und Integration über Husky](#linter-installation-und-integration-über-husky)
  - [Übersicht der Tools](#übersicht-der-tools)
    - [ESLint - JavaScript/TypeScript Code Quality](#eslint---javascripttypescript-code-quality)
      - [Was macht ESLint?](#was-macht-eslint)
      - [Hauptfunktionen:](#hauptfunktionen)
      - [Beispiele für ESLint-Regeln:](#beispiele-für-eslint-regeln)
      - [Konfiguration:](#konfiguration)
    - [Prettier - Code Formatierung](#prettier---code-formatierung)
      - [Was macht Prettier?](#was-macht-prettier)
      - [Hauptfunktionen:](#hauptfunktionen-1)
      - [Beispiele für Prettier-Formatierung:](#beispiele-für-prettier-formatierung)
      - [Konfiguration:](#konfiguration-1)
    - [Vale - Prose und Dokumentations-Linting](#vale---prose-und-dokumentations-linting)
      - [Was macht Vale?](#was-macht-vale)
      - [Hauptfunktionen:](#hauptfunktionen-2)
      - [Beispiele für Vale-Regeln:](#beispiele-für-vale-regeln)
      - [Konfiguration:](#konfiguration-2)
    - [Wie die Tools zusammenarbeiten](#wie-die-tools-zusammenarbeiten)
      - [1. Entwicklungsphase](#1-entwicklungsphase)
      - [2. Pre-commit Phase](#2-pre-commit-phase)
      - [3. CI/CD Pipeline](#3-cicd-pipeline)
    - [Workflow für Entwickler](#workflow-für-entwickler)
      - [Beim Entwickeln](#beim-entwickeln)
      - [Vor dem Commit](#vor-dem-commit)
      - [Bei Fehlern](#bei-fehlern)
  - [Installationsanleitung](#installationsanleitung)
    - [Pre-commit hooks via husky](#pre-commit-hooks-via-husky)
      - [Voraussetzungen](#voraussetzungen)
      - [Installation](#installation)
      - [Einfachen pre-commit hook anlegen](#einfachen-pre-commit-hook-anlegen)
      - [Testen](#testen)
      - [Wie wird der hook ausgelöst](#wie-wird-der-hook-ausgelöst)
      - [Doing nach dem clone](#doing-nach-dem-clone)
    - [ESLint Installation \& Konfiguration](#eslint-installation--konfiguration)
      - [ESLint Dependencies installieren](#eslint-dependencies-installieren)
      - [ESLint-Konfiguration erstellen](#eslint-konfiguration-erstellen)
      - [Lint-Script in package.json hinzufügen](#lint-script-in-packagejson-hinzufügen)
      - [Hook erweitern](#hook-erweitern)
      - [Testen](#testen-1)
      - [Troubleshooting](#troubleshooting)
      - [Hinweise](#hinweise)

## Übersicht der Tools

| Tool | Zweck | Dateitypen | Fokus |
|------|-------|------------|-------|
| **ESLint** | Code-Qualität und Best Practices | `.js`, `.ts`, `.astro`, `.jsx`, `.tsx` | JavaScript/TypeScript Syntax, Logik, Patterns |
| **Prettier** | Code-Formatierung | Alle unterstützten Dateitypen | Einheitliche Formatierung und Styling |
| **Vale** | Prose-Linting | `.md`, `.mdx`, Text in Code-Kommentaren | Schreibstil, Grammatik, Terminologie |

### ESLint - JavaScript/TypeScript Code Quality

#### Was macht ESLint?
ESLint ist ein statisches Code-Analyse-Tool für JavaScript und TypeScript, das potenzielle Probleme, Bugs und stilistische Inkonsistenzen in Ihrem Code identifiziert.

#### Hauptfunktionen:
- **Fehlerprävention**: Erkennt potenzielle Bugs und problematische Patterns
- **Code-Konsistenz**: Durchsetzt einheitliche Coding Standards
- **Best Practices**: Warnt vor anti-patterns und schlägt bessere Alternativen vor
- **Framework-Support**: Spezielle Regeln für React, Astro, Node.js etc.

#### Beispiele für ESLint-Regeln:
```javascript
// ❌ ESLint würde warnen:
var unusedVariable = 'never used';  // unused variable
if (condition = true) { }            // assignment instead of comparison
function foo() { return; }           // unreachable code

// ✅ ESLint approved:
const usedVariable = 'properly used';
if (condition === true) { }
function foo() { return 'value'; }
```

#### Konfiguration:
ESLint wird über `.eslintrc.js` oder `eslint.config.js` konfiguriert und kann projekt-spezifische Regeln definieren.

### Prettier - Code Formatierung

#### Was macht Prettier?
Prettier ist ein "opinionated" Code-Formatter, der automatisch eine einheitliche Formatierung für verschiedene Dateitypen durchsetzt.

#### Hauptfunktionen:
- **Automatische Formatierung**: Konsistente Einrückung, Zeilenlänge, Quotes etc.
- **Zero-Configuration**: Funktioniert out-of-the-box mit sinnvollen Defaults
- **Multi-Language**: Unterstützt JavaScript, TypeScript, CSS, HTML, Markdown, JSON und mehr
- **Editor-Integration**: Kann beim Speichern automatisch formatieren

#### Beispiele für Prettier-Formatierung:
```javascript
// Vorher (inkonsistent formatiert):
const obj={name:"John",age:30,city:"Berlin"};
if(condition){doSomething();} else{doSomethingElse();}

// Nachher (Prettier formatiert):
const obj = {
  name: "John",
  age: 30,
  city: "Berlin",
};

if (condition) {
  doSomething();
} else {
  doSomethingElse();
}
```

#### Konfiguration:
Prettier wird über `.prettierrc` oder `prettier.config.js` konfiguriert.

### Vale - Prose und Dokumentations-Linting

#### Was macht Vale?
Vale ist ein Syntax-aware Linter für Prosa und Dokumentation, der Schreibstil, Grammatik und Terminologie-Konsistenz überprüft.

#### Hauptfunktionen:
- **Schreibstil-Konsistenz**: Durchsetzt einheitliche Schreibregeln
- **Terminologie-Management**: Stellt sicher, dass Fachbegriffe korrekt verwendet werden
- **Syntax-Aware**: Versteht Markdown, reStructuredText, AsciiDoc etc.
- **Anpassbare Regeln**: Unterstützt verschiedene Style Guides (Google, Microsoft, etc.)

#### Beispiele für Vale-Regeln:
```markdown
❌ Vale würde warnen:
- "We should of done this differently" (should have, nicht should of)
- "The API is very easy to use" (subjektive Sprache)
- "Click here for more info" (nicht-deskriptive Links)

✅ Vale approved:
- "We should have implemented this differently"
- "The API provides a straightforward interface"
- "Read the complete documentation for detailed examples"
```

#### Konfiguration:
Vale wird über `.vale.ini` und Style-Dateien im `.vale/` Verzeichnis konfiguriert.

### Wie die Tools zusammenarbeiten

#### 1. Entwicklungsphase
- **ESLint**: Läuft im Editor und zeigt Code-Probleme in Echtzeit
- **Prettier**: Formatiert Code automatisch beim Speichern
- **Vale**: Überprüft Dokumentation und Kommentare

#### 2. Pre-commit Phase
- Alle drei Tools laufen automatisch vor jedem Git-Commit
- Verhindert, dass problematischer Code/Content committed wird
- Stellt sicher, dass alle Änderungen den Qualitätsstandards entsprechen

#### 3. CI/CD Pipeline
- Validiert, dass alle Regeln eingehalten werden
- Blockiert Merges bei Regelverstößen
- Stellt sicher, dass nur qualitativ hochwertiger Code deployed wird

### Workflow für Entwickler

#### Beim Entwickeln
1. **Code schreiben** - ESLint zeigt Probleme in Echtzeit
2. **Datei speichern** - Prettier formatiert automatisch
3. **Dokumentation schreiben** - Vale prüft Schreibstil

#### Vor dem Commit
1. **Pre-commit Hook** läuft automatisch
2. **ESLint** prüft alle geänderten Code-Dateien
3. **Prettier** formatiert alle Dateien
4. **Vale** prüft alle Markdown-Dateien
5. **Commit wird blockiert** bei Fehlern

#### Bei Fehlern
1. **ESLint-Fehler**: Code korrigieren oder `eslint --fix` verwenden
2. **Prettier-Fehler**: Automatisch behoben durch `prettier --write`
3. **Vale-Fehler**: Text manuell korrigieren oder Regel anpassen

## Installationsanleitung

### Pre-commit hooks via husky

#### Voraussetzungen
- Node.js (>=18) und npm installiert
- Git-Repository initialisiert (oder bestehendes Repo)

#### Installation
   
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

#### Einfachen pre-commit hook anlegen


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

#### Testen

Erzeuge eine Änderung, stage und committe:

```bash
git add .
git commit -m "test husky"
```

Beim Commit solltest du die Nachricht vom Hook in der Konsole sehen.

#### Wie wird der hook ausgelöst

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

#### Doing nach dem clone

Im Gegensatz zu einem hook in ".git/hooks", muss noch einmal husky lokal eingerichtet werden. Anstatt dies wie oben zu machen, wird dies Rahmen des eh notnwendigen `npm install` erledigt. 

```bash
# Abhängigkeiten installieren (führt `prepare` aus, wenn es in package.json steht)
npm install

# Falls nötig Husky manuell einrichten (sollte aber durch das npm install erledigt sein)
npm run prepare
# oder
npx husky install
```

### ESLint Installation & Konfiguration

ESLint ist ein statisches Code-Analyse-Tool für JavaScript und TypeScript, das Code-Qualität und Best Practices durchsetzt. Hier ist eine vollständige Anleitung zur Integration in ein Astro/TypeScript-Projekt.

#### ESLint Dependencies installieren

Installiere ESLint und die benötigten Plugins für TypeScript und Astro:

```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser astro-eslint-parser eslint-plugin-astro
```

**Wichtig:** Diese Dependencies müssen installiert sein, bevor ESLint verwendet werden kann!

#### ESLint-Konfiguration erstellen

Erstelle eine `.eslintrc.js` im Projekt-Root:

```javascript
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  rules: {
    // Allow unused vars that start with underscore
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    // Allow any type occasionally 
    "@typescript-eslint/no-explicit-any": "warn",
    // Allow empty interfaces for extending
    "@typescript-eslint/no-empty-interface": "off",
  },
  overrides: [
    {
      files: ["*.astro"],
      extends: ["plugin:astro/recommended"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // Astro specific rules can go here
      },
    },
  ],
};
```

#### Lint-Script in package.json hinzufügen

Füge ein `lint`-Script zu den Scripts in `package.json` hinzu:

```json
"scripts": {
  "lint": "eslint ./src --ext .js,.ts,.jsx,.tsx,.astro --fix",
  "lint:check": "eslint ./src --ext .js,.ts,.jsx,.tsx,.astro"
}
```

Das `--fix` Flag repariert automatisch behebbare Probleme. Mit `lint:check` kannst du nur prüfen, ohne automatische Reparaturen.

#### Hook erweitern

Erweitere den Husky pre-commit Hook, um ESLint auszuführen:

```sh
#!/usr/bin/env sh
echo "Execute linting -> code quality and best practices"
npm run lint:check
```

#### Testen

**Zuerst die Dependencies installieren (falls noch nicht geschehen):**

```bash
npm install
```

Dann das ESLint-Setup testen:

```bash
# ESLint manuell ausführen (nur prüfen)
npm run lint:check

# ESLint mit automatischen Reparaturen
npm run lint

# Mit einem Commit testen (führt den Hook aus)
git add .
git commit -m "test eslint integration"
```

#### Troubleshooting

**Fehler: "ESLint couldn't find the config '@typescript-eslint/recommended'"**

Das bedeutet, die TypeScript ESLint-Plugins sind nicht installiert. Führe aus:

```bash
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser astro-eslint-parser eslint-plugin-astro
```

#### Hinweise

- ESLint wird nun bei jedem Commit automatisch ausgeführt und versucht, Probleme zu beheben
- Falls ESLint Fehler findet, die nicht automatisch behoben werden können, wird der Commit blockiert
- Du kannst einzelne Regeln in der `.eslintrc.js` anpassen oder deaktivieren
- Für größere Projekte empfiehlt sich die Verwendung von `lint-staged`, um nur geänderte Dateien zu prüfen
