# Linting und Code Quality Tools

Dieses Projekt verwendet drei verschiedene Tools zur Sicherstellung der Code- und Content-Qualität. Jedes Tool erfüllt einen spezifischen Zweck in unserem Entwicklungsprozess.

## Übersicht der Tools

| Tool | Zweck | Dateitypen | Fokus |
|------|-------|------------|-------|
| **ESLint** | Code-Qualität und Best Practices | `.js`, `.ts`, `.astro`, `.jsx`, `.tsx` | JavaScript/TypeScript Syntax, Logik, Patterns |
| **Prettier** | Code-Formatierung | Alle unterstützten Dateitypen | Einheitliche Formatierung und Styling |
| **Vale** | Prose-Linting | `.md`, `.mdx`, Text in Code-Kommentaren | Schreibstil, Grammatik, Terminologie |

## ESLint - JavaScript/TypeScript Code Quality

### Was macht ESLint?
ESLint ist ein statisches Code-Analyse-Tool für JavaScript und TypeScript, das potenzielle Probleme, Bugs und stilistische Inkonsistenzen in Ihrem Code identifiziert.

### Hauptfunktionen:
- **Fehlerprävention**: Erkennt potenzielle Bugs und problematische Patterns
- **Code-Konsistenz**: Durchsetzt einheitliche Coding Standards
- **Best Practices**: Warnt vor anti-patterns und schlägt bessere Alternativen vor
- **Framework-Support**: Spezielle Regeln für React, Astro, Node.js etc.

### Beispiele für ESLint-Regeln:
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

### Konfiguration:
ESLint wird über `.eslintrc.js` oder `eslint.config.js` konfiguriert und kann projekt-spezifische Regeln definieren.

## Prettier - Code Formatierung

### Was macht Prettier?
Prettier ist ein "opinionated" Code-Formatter, der automatisch eine einheitliche Formatierung für verschiedene Dateitypen durchsetzt.

### Hauptfunktionen:
- **Automatische Formatierung**: Konsistente Einrückung, Zeilenlänge, Quotes etc.
- **Zero-Configuration**: Funktioniert out-of-the-box mit sinnvollen Defaults
- **Multi-Language**: Unterstützt JavaScript, TypeScript, CSS, HTML, Markdown, JSON und mehr
- **Editor-Integration**: Kann beim Speichern automatisch formatieren

### Beispiele für Prettier-Formatierung:
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

### Konfiguration:
Prettier wird über `.prettierrc` oder `prettier.config.js` konfiguriert.

## Vale - Prose und Dokumentations-Linting

### Was macht Vale?
Vale ist ein Syntax-aware Linter für Prosa und Dokumentation, der Schreibstil, Grammatik und Terminologie-Konsistenz überprüft.

### Hauptfunktionen:
- **Schreibstil-Konsistenz**: Durchsetzt einheitliche Schreibregeln
- **Terminologie-Management**: Stellt sicher, dass Fachbegriffe korrekt verwendet werden
- **Syntax-Aware**: Versteht Markdown, reStructuredText, AsciiDoc etc.
- **Anpassbare Regeln**: Unterstützt verschiedene Style Guides (Google, Microsoft, etc.)

### Beispiele für Vale-Regeln:
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

### Konfiguration:
Vale wird über `.vale.ini` und Style-Dateien im `.vale/` Verzeichnis konfiguriert.

## Wie die Tools zusammenarbeiten

### 1. **Entwicklungsphase**
- **ESLint**: Läuft im Editor und zeigt Code-Probleme in Echtzeit
- **Prettier**: Formatiert Code automatisch beim Speichern
- **Vale**: Überprüft Dokumentation und Kommentare

### 2. **Pre-commit Phase**
- Alle drei Tools laufen automatisch vor jedem Git-Commit
- Verhindert, dass problematischer Code/Content committed wird
- Stellt sicher, dass alle Änderungen den Qualitätsstandards entsprechen

### 3. **CI/CD Pipeline**
- Validiert, dass alle Regeln eingehalten werden
- Blockiert Merges bei Regelverstößen
- Stellt sicher, dass nur qualitativ hochwertiger Code deployed wird

## Workflow für Entwickler

### Beim Entwickeln:
1. **Code schreiben** - ESLint zeigt Probleme in Echtzeit
2. **Datei speichern** - Prettier formatiert automatisch
3. **Dokumentation schreiben** - Vale prüft Schreibstil

### Vor dem Commit:
1. **Pre-commit Hook** läuft automatisch
2. **ESLint** prüft alle geänderten Code-Dateien
3. **Prettier** formatiert alle Dateien
4. **Vale** prüft alle Markdown-Dateien
5. **Commit wird blockiert** bei Fehlern

### Bei Fehlern:
1. **ESLint-Fehler**: Code korrigieren oder `eslint --fix` verwenden
2. **Prettier-Fehler**: Automatisch behoben durch `prettier --write`
3. **Vale-Fehler**: Text manuell korrigieren oder Regel anpassen

## Installation und Setup

Die Tools werden über npm/yarn installiert und über Git-Hooks automatisch ausgeführt. Die Konfiguration erfolgt über die jeweiligen Config-Dateien im Projekt-Root.

## Nutzen

- **Konsistente Code-Qualität**: Alle Entwickler halten die gleichen Standards ein
- **Automatisierte Qualitätssicherung**: Reduziert manuelle Code-Reviews
- **Bessere Lesbarkeit**: Einheitlicher Code- und Schreibstil
- **Weniger Bugs**: Frühe Erkennung von Problemen
- **Professionelle Dokumentation**: Hochwertige, konsistente Texte

---
