# Prompt: image-alt-caption

Ziel / Intent Erzeuge präzise `alt`‑Texte, kurze Bildunterschriften (captions) und optionale
Bild‑Metadaten für SEO und Barrierefreiheit.

Kontext Bilder liegen in `src/assets/` oder `public/`; Inhalte werden in MDX eingebunden. Ziel ist
bessere A11y + SEO.

Inputs

- image_description: kurze Beschreibung des Bildinhalts (oder der Kontext, in dem das Bild genutzt
  wird)
- purpose: decorative | informative | data | screenshot

Erwartete Ausgabe

- alt: ein prägnanter alt‑Text (≤125 Zeichen) — für dekorative Bilder leer: ""
- caption: kurze Bildunterschrift (ein Satz)
- suggested_keywords: 3–6 Schlagwörter für Bild‑Metadaten

Constraints

- Für decorative: alt = "" und caption optional.
- Keine unnötigen Keywords; beschreibe das Bild objektiv.
- Kurze, nutzerzentrierte Sprache.

Beispiel Input: image_description="Screenshot des Backup‑Scripts, zeigt rsync-Ausgabe im Terminal",
purpose=informative

Output:

- alt: "Terminalausgabe des Backup‑Scripts mit rsync‑Protokoll"
- caption: "Screenshot: rsync‑Log während eines lokalen Backups"
- suggested_keywords: ["rsync","Backup","Terminal","Log"]
