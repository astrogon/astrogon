# Vale Setup - Quick Start Guide

Vale ist jetzt im Repository integriert! Hier eine schnelle Anleitung für neue Entwickler.

## Installation

Nach dem Clone des Repositories:

```bash
# 1. Dependencies installieren
npm install

# 2. Vale binary installieren (einmalig)
npm run install-vale

# 3. Installation testen
./tools/vale --version
```

## Verwendung

```bash
# Alle Markdown-Dateien prüfen
npm run prose:check

# Nur bestimmte Dateien prüfen
./tools/vale --config=.vale.ini docs/README.md

# Alle Linter zusammen ausführen
npm run lint:all
```

## Automatische Ausführung

Vale läuft automatisch bei jedem Git-Commit über den Husky pre-commit Hook:

```bash
git add .
git commit -m "your message"
# → Prettier, ESLint und Vale laufen automatisch
```

## Häufige Vale-Probleme beheben

### Wiederholungen (Vale.Repetition)
```markdown
❌ "die die Lösung" 
✅ "die Lösung"

❌ "das das Problem"
✅ "das Problem"
```

### Projektspezifische Begriffe
Füge technische Begriffe zur Whitelist hinzu: `.vale/styles/Base/accept.txt`

### Vale-Regeln anpassen
Editiere `.vale.ini` um Regeln zu deaktivieren oder anzupassen:

```ini
# Weniger streng machen
MinAlertLevel = warning

# Spezifische Regel deaktivieren
Vale.Repetition = NO
```

## Hilfe

- Vale kann **nicht automatisch fixen** - alle Änderungen sind manuell
- Bei Fragen siehe: `docs/linter-installation.md`
- Vale Dokumentation: https://vale.sh/docs/
