# Link Redirect System - Dokumentation

## Übersicht

Das Link Redirect System ermöglicht es dir, Links zentral zu verwalten, Klicks zu tracken und bei Affiliate-Links automatisch Compliance-konforme Weiterleitungen mit Disclosure zu erstellen.

## Features

- ✅ **Zentrale Link-Verwaltung** über JSON-Datei
- ✅ **Click-Tracking** für Analytics
- ✅ **Affiliate-Link Compliance** mit automatischem Disclosure
- ✅ **Zwischenseite** für transparente Weiterleitungen
- ✅ **Analytics Dashboard** zur Überwachung
- ✅ **SEO-konforme** rel-Attribute
- ✅ **Responsive Design** mit Glass Morphism

## Dateien

### Core System
- `/src/data/link-mappings.json` - Link-Konfiguration
- `/src/lib/redirectService.ts` - Service-Funktionen
- `/src/types/redirect.ts` - TypeScript-Typen
- `/src/pages/redirect/[id].ts` - API Route für Weiterleitungen
- `/src/pages/redirect-info/[id].astro` - Info-Seite vor Weiterleitung
- `/src/components/common/RedirectLink.astro` - Link-Komponente
- `/src/pages/analytics.astro` - Analytics Dashboard

## Verwendung

### 1. Links hinzufügen

Bearbeite `/src/data/link-mappings.json`:

```json
{
  "links": {
    "dein-link-id": {
      "title": "Produktname",
      "description": "Beschreibung des Produkts",
      "targetUrl": "https://amazon.de/dp/ABC123?tag=dein-tag",
      "provider": "Amazon",
      "category": "Electronics",
      "affiliate": true,
      "clicks": 0,
      "created": "2025-08-23",
      "lastUpdated": "2025-08-23"
    }
  }
}
```

### 2. Links in Content verwenden

#### Option A: RedirectLink Komponente
```astro
---
import RedirectLink from "@components/common/RedirectLink.astro";
---

<RedirectLink 
  id="dein-link-id" 
  text="Produkt kaufen"
  showProvider={true} 
/>
```

#### Option B: Markdown Link
```markdown
[Produkt kaufen](/api/redirect?id=dein-link-id)
```

#### Option C: HTML Link
```html
<a href="/api/redirect?id=dein-link-id" rel="nofollow sponsored">
  Produkt kaufen
</a>
```

### 3. Analytics anzeigen

Besuche `/analytics` für:
- Gesamte Klick-Statistiken
- Link-Performance Übersicht  
- Sortierung nach Popularität
- Verwendungsbeispiele

## URL-Schema

- `/api/redirect?id={id}` - API Route für Redirects
- `/redirect-info?id={id}` - Info-Seite (für Affiliate Links)
- `/analytics` - Analytics Dashboard

## Workflow

### Für Affiliate Links:
1. User klickt Link → `/api/redirect?id={id}`
2. System erkennt Affiliate-Link
3. Weiterleitung zu `/redirect-info?id={id}`
4. Klick wird gezählt
5. Info-Seite zeigt Disclosure
6. Auto-Redirect nach 3 Sekunden

### Für normale Links:
1. User klickt Link → `/api/redirect?id={id}`
2. Klick wird gezählt
3. Direkte Weiterleitung zum Ziel

## Amazon Affiliate Compliance

✅ **Transparent**: Info-Seite zeigt klar, dass es ein Affiliate-Link ist
✅ **Disclosure**: Pflichthinweis wird angezeigt
✅ **rel-Attribute**: `nofollow sponsored` für SEO
✅ **Erkennbar**: Amazon-URL bleibt sichtbar
✅ **Opt-out**: User kann zurück navigieren

## Performance

- **Minimaler Overhead**: Nur ein API-Call pro Klick
- **Static Generation**: Astro optimiert automatisch
- **File-based**: Keine Datenbank nötig
- **Cacheable**: Redirect-Responses sind cachebar

## Erweiterungsmöglichkeiten

### Prometheus Integration (später)
```typescript
// In redirectService.ts hinzufügen:
import { pushMetric } from './prometheusClient';

export async function incrementClickCount(id: string) {
  // ... existing code ...
  
  // Push to Prometheus
  await pushMetric('link_clicks_total', 1, { link_id: id });
}
```

### A/B Testing
```json
{
  "ab-test-link": {
    "targets": [
      { "url": "https://amazon.de/option-a", "weight": 50 },
      { "url": "https://amazon.de/option-b", "weight": 50 }
    ]
  }
}
```

### Zeitbasierte Links
```json
{
  "seasonal-deal": {
    "targetUrl": "https://amazon.de/winter-sale",
    "validUntil": "2025-12-31",
    "fallbackUrl": "https://amazon.de/regular-price"
  }
}
```

## Beispiel-Integration in Blog Post

```mdx
---
title: "Arduino Projekte für Anfänger"
---

# Arduino Projekte

Für den Einstieg empfehle ich dieses 
<RedirectLink id="arduino-starter-kit" text="Arduino Starter Kit" showProvider={true} />.

Es enthält alles was du brauchst:
- Arduino Uno Board
- Breadboard und Kabel
- Verschiedene Sensoren
- Anleitungsbuch

Alternativ kannst du auch einzelne Komponenten kaufen:
- [Arduino Uno Board](/api/redirect?id=arduino-uno-board)
- [Breadboard Set](/api/redirect?id=breadboard-set)
```

## Monitoring

Das System trackt automatisch:
- **Click Count** pro Link
- **Total Clicks** systemweit
- **Last Updated** Timestamps
- **Performance** über Analytics Dashboard

## Wartung

- **Links hinzufügen**: JSON-Datei bearbeiten
- **URLs aktualisieren**: JSON-Datei bearbeiten  
- **Analytics zurücksetzen**: Click-Counter in JSON auf 0 setzen
- **Broken Links finden**: Analytics Dashboard zeigt ungenutzte Links
