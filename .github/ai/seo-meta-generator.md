# Prompt: seo-meta-generator

Ziel / Intent Erzeuge präzise SEO Meta‑Tags (meta title, meta description) und OpenGraph / Twitter
Card Felder aus einem Post‑Excerpt oder Draft.

Kontext Repo nutzt Astro und `BaseLayout` erzeugt OG‑Tags aus Frontmatter. Die Meta‑Strings sollen
in das Frontmatter oder in eine `meta`-Sektion passen.

Inputs

- excerpt: kurzer Textauszug (1–3 Absätze) oder Post‑Draft
- target_keywords (optional): Liste relevanter Keywords

Erwartete Ausgabe

- meta_title (≤60 Zeichen)
- meta_description (≤155 Zeichen)
- og_title (falls abweichend)
- og_description (falls abweichend)
- twitter_title, twitter_description
- 3 Vorschläge für `og:image` Beschreibungen (kurz) — keine Bilder erzeugen, nur Beschreibungen für
  Auswahl

Constraints

- Keine HTML‑Tags im Output.
- Verwende aktive Sprache, rich keywords, vermeide Keyword‑Stuffing.
- Beschreibung auf Nutzer‑Intent ausrichten (Was lernt der Leser?).

Beispiel Input excerpt: "In diesem Beitrag erkläre ich, wie man ein sicheres lokales Backup mit
rsync und einem Cronjob einrichtet."

Output (Kurz):

- meta_title: "Lokales Backup mit rsync & Cron — Anleitung"
- meta_description: "Schritt‑für‑Schritt: rsync konfigurieren, Cronjob einrichten und Restore testen
  — sichere Backups für dein NAS."
- og_image Vorschläge: "Screenshot: rsync logfile\nDiagram: Backup Zeitplan\nFoto: kleines
  NAS-Gerät"
