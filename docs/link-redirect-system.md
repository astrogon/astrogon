# Link Redirect System - Dokumentation

## Übersicht

Das Link Redirect System ermöglicht es dir, Links zentral zu verwalten, Klicks zu tracken und bei
Affiliate-Links automatisch Compliance-konforme Weiterleitungen mit Disclosure zu erstellen. **Das
System ist vollständig GitHub Pages kompatibel** und funktioniert ohne Server-Side Rendering.

## Features

- ✅ **GitHub Pages Kompatibel** - Rein client-side Lösung
- ✅ **Zentrale Link-Verwaltung** über statische JSON-Datei
- ✅ **Click-Tracking** via LocalStorage (Privacy-friendly)
- ✅ **Affiliate-Link Compliance** mit automatischem Disclosure
- ✅ **Zwischenseite** für transparente Weiterleitungen
- ✅ **SEO-konforme** rel-Attribute
- ✅ **Responsive Design** mit Glass Morphism
- ✅ **TypeScript** Type-Safety

## Dateien

### Core System

- `/public/data/link-mappings.json` - Link-Konfiguration (statisch)
- `/src/lib/clientRedirectService.ts` - Client-side Service-Funktionen
- `/src/types/index.d.ts` - TypeScript-Typen
- `/src/pages/redirect-info.astro` - Info-Seite vor Weiterleitung
- `/src/components/common/RedirectLink.astro` - Link-Komponente
- `/src/pages/link-test.astro` - Test-Seite für alle Features

## Verwendung

### 1. Links hinzufügen

Bearbeite `/public/data/link-mappings.json`:

```json
{
  "links": {
    "dein-link-id": {
      "targetUrl": "https://amzn.to/xyz123",
      "description": "Empfohlenes Arduino Starter Kit",
      "category": "Electronics",
      "affiliate": true,
      "openInNewTab": true
    },
    "github-project": {
      "targetUrl": "https://github.com/user/project",
      "description": "Mein Open Source Projekt",
      "category": "Development",
      "affiliate": false,
      "openInNewTab": true
    }
  },
  "analytics": {
    "totalClicks": 0,
    "lastUpdated": "2025-08-23"
  }
}
```

### 2. Links in Content verwenden

#### Option A: RedirectLink Komponente (Empfohlen)

```astro
---
import RedirectLink from "@components/common/RedirectLink.astro";
---

<RedirectLink id="dein-link-id" text="Arduino Starter Kit kaufen" className="custom-link-style" />
```

#### Option B: Direkte onclick-Handler

```html
<a href="#" onclick="handleRedirectClick('dein-link-id', window.location.href); return false;">
  Produkt kaufen
</a>
```

**Hinweis:** Markdown-Links und direkte href-Links funktionieren nicht mehr, da das System jetzt
client-side JavaScript erfordert.

### 3. Analytics anzeigen

**Click-Tracking erfolgt automatisch via LocalStorage:**

- Öffne Browser DevTools → Application → LocalStorage
- Schlüssel `linkClickCounts`: Klicks pro Link-ID
- Schlüssel `totalLinkClicks`: Gesamte Klicks
- Schlüssel `lastLinkUpdate`: Letztes Update

**Analytics-Funktionen:**

```javascript
import { getAnalytics, getClickCount } from "@/lib/clientRedirectService";

// Alle Analytics-Daten abrufen
const analytics = getAnalytics();
console.log("Total clicks:", analytics.totalClicks);
console.log("Per link:", analytics.linkCounts);

// Klicks für spezifischen Link
const clicks = getClickCount("dein-link-id");
```

## URL-Schema

- **Test-Seite:** `/link-test` - Alle Features testen
- **Redirect-Info:** `/redirect-info?id={id}` - Info-Seite für Affiliate Links
- **JSON-Daten:** `/data/link-mappings.json` - Statische Link-Konfiguration

## Workflow

### Für Affiliate Links:

1. User klickt RedirectLink → JavaScript `handleRedirectClick()`
2. System lädt Link-Daten aus `/data/link-mappings.json`
3. Erkennt Affiliate-Link (`affiliate: true`)
4. Weiterleitung zu `/redirect-info?id={id}`
5. Klick wird in LocalStorage gezählt
6. Info-Seite zeigt Disclosure mit 10 Sekunden Countdown
7. Auto-Redirect zum Ziel-Link

### Für normale Links:

1. User klickt RedirectLink → JavaScript `handleRedirectClick()`
2. System lädt Link-Daten aus JSON
3. Klick wird in LocalStorage gezählt
4. Direkte Weiterleitung zum Ziel (new tab/same tab je nach Konfiguration)

## Amazon Affiliate Compliance

✅ **Transparent**: Info-Seite zeigt klar, dass es ein Affiliate-Link ist ✅ **Disclosure**:
Pflichthinweis wird angezeigt ✅ **rel-Attribute**: `nofollow sponsored` für SEO ✅ **Erkennbar**:
Amazon-URL bleibt sichtbar ✅ **Opt-out**: User kann zurück navigieren

## Performance & GitHub Pages

- ✅ **GitHub Pages Kompatibel**: Keine Server-Side Features
- ✅ **Statische Dateien**: JSON-Konfiguration in `/public/data/`
- ✅ **Client-Side Only**: Funktioniert ohne Backend
- ✅ **Minimaler Overhead**: Ein JSON-Fetch pro Session
- ✅ **Privacy-Friendly**: LocalStorage statt Server-Tracking
- ✅ **Fast Loading**: Keine API-Calls, direktes JSON
- ✅ **SEO-Friendly**: Korrekte rel-Attribute werden gesetzt

## Hosting-Kompatibilität

**✅ Funktioniert mit:**

- GitHub Pages (Static)
- Netlify Static
- Vercel Static
- Alle Static Site Hosts

**❌ Nicht erforderlich:**

- Server-Side Rendering
- API Routes
- Datenbank
- Backend Services

## Erweiterungsmöglichkeiten

### Externe Analytics Integration

```typescript
// In clientRedirectService.ts hinzufügen:
export function incrementClickCount(id: string): void {
  // ... existing LocalStorage code ...

  // Optional: Send to external analytics
  if (typeof gtag !== "undefined") {
    gtag("event", "link_click", {
      link_id: id,
      custom_parameter: "value",
    });
  }
}
```

### Erweiterte Link-Konfiguration

```json
{
  "advanced-link": {
    "targetUrl": "https://example.com",
    "description": "Advanced link with scheduling",
    "affiliate": true,
    "openInNewTab": false,
    "validFrom": "2025-01-01",
    "validUntil": "2025-12-31",
    "fallbackUrl": "https://fallback.com",
    "geoTargeting": {
      "DE": "https://amazon.de/product",
      "US": "https://amazon.com/product"
    }
  }
}
```

### Custom Analytics Dashboard

```astro
---
// src/pages/link-analytics.astro
---

<script>
  import { getAnalytics } from "@/lib/clientRedirectService";

  function displayAnalytics() {
    const analytics = getAnalytics();
    // Render analytics data
  }
</script>
```

## Beispiel-Integration in Blog Post

```mdx
---
title: "Arduino Projekte für Anfänger"
---

import RedirectLink from "@components/common/RedirectLink.astro";

# Arduino Projekte

Für den Einstieg empfehle ich dieses

<RedirectLink id="arduino-starter-kit" text="Arduino Starter Kit" />.

Es enthält alles was du brauchst:

- Arduino Uno Board
- Breadboard und Kabel
- Verschiedene Sensoren
- Anleitungsbuch

Weitere empfohlene Komponenten:

- <RedirectLink id="arduino-uno-board" text="Arduino Uno Board" />
- <RedirectLink id="breadboard-set" text="Breadboard Set" />
```

## Testing

Besuche `/link-test` um alle Features zu testen:

- ✅ Affiliate Links mit Disclosure-Seite
- ✅ Normale Links mit direkter Weiterleitung
- ✅ Click-Tracking Funktionalität
- ✅ Responsive Design
- ✅ Dark/Light Mode Kompatibilität

## Monitoring & Analytics

Das System trackt automatisch via LocalStorage:

- **Click Count** pro Link-ID in `linkClickCounts`
- **Total Clicks** systemweit in `totalLinkClicks`
- **Last Updated** Timestamp in `lastLinkUpdate`

### Analytics-Funktionen:

```javascript
// Alle Analytics-Daten
const analytics = getAnalytics();

// Spezifische Link-Klicks
const clicks = getClickCount("link-id");

// Click-Count erhöhen
incrementClickCount("link-id");
```

### Browser DevTools Monitoring:

1. F12 → Application Tab
2. LocalStorage → dein-domain
3. Überprüfe Keys: `linkClickCounts`, `totalLinkClicks`

## Wartung

- **Links hinzufügen**: `/public/data/link-mappings.json` bearbeiten
- **URLs aktualisieren**: JSON-Datei bearbeiten
- **Analytics zurücksetzen**: LocalStorage löschen oder neu deployment
- **Testing**: `/link-test` Seite verwenden
- **Debugging**: Browser DevTools Console für Logs

## Migration von API-System

Falls du vom alten API-basierten System migrierst:

1. **Link-Konfiguration** von `/src/data/` nach `/public/data/` verschieben
2. **API-Calls** durch `RedirectLink` Komponente ersetzen
3. **Astro Config** auf `output: "static"` setzen
4. **Import-Pfade** in Komponenten anpassen
5. **Testing** über `/link-test` durchführen
