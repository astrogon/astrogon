# GitHub Copilot Instructions

## Projektübersicht

Dies ist ein **Astro-basiertes Static Site Generator Projekt** mit dem Namen "Frickeldave", das als Multi-Content-Plattform für Blogs, ein Training und eine Rezeptsammlung enthält und als Portfolio dient.

## Tech Stack

### Core Framework
- **Astro 5.13.2** - Static Site Generator mit Islands Architecture
- **TypeScript** - Typsichere Entwicklung
- **React 18** - Für interaktive Komponenten
- **Tailwind CSS** - Utility-first CSS Framework

### Content Management
- **Astro Content Collections** - Typisierte Inhalte mit Frontmatter
- **MDX** - Markdown mit React-Komponenten
- **Gray Matter** - Frontmatter-Parsing

### Styling & UI
- **SCSS** - CSS-Präprozessor
- **Tailwind CSS** mit Bootstrap Grid
- **Glass Morphism** Design-System
- **Radix UI** - Accessible UI Components
- **React Icons** - Icon-Library

### Features
- **Pagefind** - Client-side Search
- **RSS Feed** - Automatische Feed-Generierung
- **Sitemap** - SEO-optimierte Sitemaps
- **Math Rendering** - KaTeX für mathematische Formeln
- **Dark/Light Mode** - Theme-Switching

### Build & Deployment
- **Cloudflare Pages** - Hosting & Deployment
- **Wrangler** - Cloudflare CLI Tool

## Projektstruktur

```
src/
├── components/          # Wiederverwendbare UI-Komponenten
│   ├── base/           # Layout-Komponenten (Header, Footer, BaseLayout)
│   ├── common/         # Gemeinsame Komponenten (Button, Pagination, etc.)
│   ├── blog/           # Blog-spezifische Komponenten
│   ├── docs/           # Dokumentations-Komponenten
│   ├── recipes/        # Rezept-Komponenten
│   ├── poetry/         # Poesie-Komponenten
│   ├── portfolio/      # Portfolio-Komponenten
│   └── authors/        # Autoren-Komponenten
├── content/            # Content Collections (Markdown/MDX)
│   ├── blog/           # Blog-Posts
│   ├── docs/           # Dokumentation
│   ├── recipes/        # Rezepte
│   ├── poetry/         # Gedichte
│   └── authors/        # Autorenprofile
├── lib/                # Utility-Funktionen
├── pages/              # Astro-Seiten (Router)
├── styles/             # SCSS-Stylesheets
└── types/              # TypeScript-Typdefinitionen
```

## Coding Standards & Patterns

### Astro-Komponenten
- Verwende `.astro` für statische Komponenten
- Verwende React (`.tsx`) nur für interaktive Features
- Nutze `client:load` sparsam, bevorzuge `client:idle` oder `client:visible`
- Implementiere das Component Island Pattern

### TypeScript
- Definiere explizite Interfaces für Props
- Nutze die Astro Content Collection Types aus `@/types`
- Verwende `Astro.props` für Component Props
- Implementiere Type Guards für Content Validation

### Styling
- Nutze Tailwind-Klassen für Styling
- Verwende das Glass Morphism Design System (`glass` Klassen)
- Implementiere Responsive Design mit Breakpoints
- Nutze CSS Grid und Flexbox für Layouts

### Content Collections
- Alle Inhalte sind typisiert über `src/content.config.ts`
- Verwende Frontmatter für Metadaten
- Nutze `getCollection()` und `getEntryBySlug()` für Content-Queries
- Implementiere Pagination für große Collections

## Wichtige Patterns

### Layout-Pattern
```astro
---
// Component script
import BaseLayout from "@components/base/BaseLayout.astro";
interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;
---

<BaseLayout {title} {description}>
  <!-- Component content -->
</BaseLayout>
```

### Content Collection Pattern
```astro
---
import { getCollection } from "astro:content";
import type { BlogEntry } from "@/types";

const entries = (await getCollection("blog")) as BlogEntry[];
---
```

### React Island Pattern
```astro
---
import InteractiveComponent from "@components/InteractiveComponent";
---

<InteractiveComponent client:load />
```

## Spezielle Konfigurationen

### Auto-Import
- Button, Accordion, Notice, Tabs komponenten werden automatisch importiert
- YouTube-Komponente ist temporär deaktiviert (ES Module Konflikt)

### Bildoptimierung
- Nutze `astro:assets` für optimierte Bilder
- Verwende `Image` Component mit expliziten Dimensionen
- Implementiere `loading="eager"` für Above-the-fold Bilder

### SEO & Meta
- Alle Seiten nutzen `BaseLayout` für konsistente Meta-Tags
- OpenGraph und Twitter Cards werden automatisch generiert
- Sitemap und RSS werden automatisch erstellt

## Content-Typen

### Blog Posts
- Markdown/MDX mit Frontmatter
- Unterstützt Tags, Kategorien, Autoren
- Table of Contents automatisch generiert
- Related Posts basierend auf Tags

### Dokumentation
- Hierarchische Struktur mit Browser-Navigation
- Unterstützt Code-Syntax-Highlighting
- Math-Formeln mit KaTeX

### Rezepte
- Strukturierte Daten (Zutaten, Anweisungen, Zeit)
- Responsive Card-Layout
- Filterbare Listen

## Performance-Optimierungen

- Prefetch für bessere Navigation
- Lazy Loading für Bilder
- Code Splitting mit Islands
- Minimale JavaScript-Bundles

## Besonderheiten

### Glass Morphism Design
- Verwende `glass` Klassen für das Design-System
- Gradients mit `gradient` Klassen
- Animations mit `intersect:animate-*` Klassen

### Search Integration
- Pagefind für client-side search
- Automatische Indexierung nach Build
- Search-Interface in Header

### Theme System
- Dark/Light Mode Toggle
- CSS Custom Properties für Farben
- Responsive Design-System

## Entwicklungs-Workflow

1. **Content erstellen** in entsprechender Collection
2. **Komponenten entwickeln** mit TypeScript-Interfaces
3. **Styling** mit Tailwind CSS
4. **Testing** lokal mit `npm run dev`
5. **Build** mit `npm run build`
6. **Deploy** auf Cloudflare Pages

## Best Practices

- Nutze semantisches HTML
- Implementiere Accessibility (ARIA, alt-texts)
- Optimiere für Core Web Vitals
- Verwende progressive Enhancement
- Implementiere Error Boundaries
- Nutze TypeScript für Type Safety
- **Linter-Compliance**: Alle Code-Änderungen müssen ESLint, Prettier und Vale bestehen
- **Code-Reviews**: Prüfe Linter-Output vor Commits
- **Type Safety**: Vermeide `any`-Types, verwende explizite Interfaces

## Debugging & Development

- Astro Dev Server läuft auf Port 4321
- Hot Module Replacement für schnelle Entwicklung
- TypeScript-Checking in VS Code
- Browser DevTools für Performance-Monitoring

## Code Quality & Linting

### Linter-Konfiguration
Das Projekt nutzt mehrere Linter zur Code-Qualitätssicherung:

- **ESLint** - JavaScript/TypeScript Code-Analyse
- **Prettier** - Code-Formatierung 
- **Vale** - Prose/Content Linting für Markdown-Dateien

### Linting-Workflow
**WICHTIG**: Bei JEDER Code-Änderung müssen alle Linter-Regeln eingehalten werden:

1. **ESLint-Regeln beachten**:
   - Keine unverwendeten Variablen/Parameter (Prefix mit `_` wenn nötig)
   - Explizite TypeScript-Typen verwenden
   - Keine `any`-Types ohne Begründung
   - Arrow Functions für Callbacks bevorzugen

2. **Prettier-Formatierung**:
   - Automatische Code-Formatierung
   - Konsistente Einrückung und Zeilenumbrüche
   - Läuft automatisch bei Save (VS Code)

3. **Vale Content-Linting**:
   - Prüft Markdown/MDX Dateien auf Schreibstil
   - Terminologie-Konsistenz
   - Readability-Checks

### Linter Commands
```bash
# ESLint prüfen und fixen
npm run lint
npm run lint:fix

# Prettier formatieren  
npm run format

# Vale prüfen (Markdown/Content)
vale src/content/
```

### VS Code Integration
- ESLint Extension aktiviert
- Prettier Extension aktiviert  
- Format on Save aktiviert
- Auto-Fix on Save für ESLint

### Linter-Fehler beheben
- **Unbenutzte Parameter**: Prefix mit `_` (`_unusedParam`)
- **Implizite any-Types**: Explizite Typen definieren
- **Missing return types**: Return-Type annotieren
- **Console.log**: Nur für Debugging, vor Commit entfernen

## Code-Konventionen

- **Komponenten**: PascalCase (`BlogCard.astro`)
- **Props**: camelCase mit TypeScript Interfaces
- **CSS-Klassen**: Tailwind Utility Classes
- **Dateien**: kebab-case für URLs und IDs
- **Variablen**: camelCase
- **Konstanten**: UPPER_SNAKE_CASE

## GitHub Copilot Regeln

### Obligatorische Linter-Prüfung
**WICHTIG**: GitHub Copilot muss bei ALLEN Code-Änderungen folgende Prüfungen durchführen:

1. **ESLint-Compliance**: Alle TypeScript/JavaScript-Dateien müssen ESLint-Regeln erfüllen
2. **Prettier-Formatierung**: Code muss korrekt formatiert sein
3. **Vale-Prüfung**: Markdown/MDX-Inhalte müssen Vale-Regeln bestehen
4. **TypeScript-Typen**: Explizite Typen ohne `any` verwenden
5. **Unbenutzte Variablen**: Mit `_` prefix markieren oder entfernen

### Workflow bei Code-Änderungen
```bash
# 1. ESLint prüfen
npm run lint

# 2. Prettier formatieren
npm run format

# 3. Vale für Markdown prüfen
vale src/content/

# 4. TypeScript-Checking
npm run type-check
```

### Fehlerbehebung-Prioritäten
1. **ESLint-Fehler** sofort beheben
2. **TypeScript-Kompilier-Fehler** sofort beheben  
3. **Prettier-Formatierung** automatisch anwenden
4. **Vale-Warnungen** in Markdown-Dateien beachten

Diese Anweisungen helfen GitHub Copilot dabei, kontextspezifische und projektkonform Vorschläge zu generieren.
