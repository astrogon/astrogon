# Prompt: create-blog-post

Ziel / Intent Erzeuge einen vollständigen Draft für einen Blog‑Post im Astro/MDX Format inklusive
Frontmatter, TL;DR, Outline und SEO‑Meta.

Kontext Repo-Technologien: Astro, MDX, TypeScript, Tailwind. Posts liegen in `src/content/blog/` als
`.md` bzw. `.mdx`.

Inputs

- title: Thema / Arbeits-Titel
- topic_summary: 2–4 Sätze, worum es geht
- tags (optional): Liste von Tags
- tone (optional): z. B. technical, casual, tutorial

Erwartete Ausgabe

- Valides Frontmatter mit Feldern: `title`, `date` (ISO), `description`, `tags`, `draft`
  (true/false)
- TL;DR (150–200 Wörter)
- 5‑teilige Outline mit H2‑Headlines
- Ein Beispiel‑Intro (1–2 Absätze) und ein kurzes Conclusion/Call‑to‑Action
- SEO meta fields: meta title (≤60 chars), meta description (≤155 chars)

Constraints

- Keine Secrets oder persönliche Daten in Text.
- Vermeide generische Floskeln; konkret und nützlich schreiben.
- Frontmatter Werte als YAML.

Beispiel Input:

- title: "Lokales Backup mit rsync und Cron"
- topic_summary: "Schritt‑für‑Schritt Anleitung zur Einrichtung eines täglichen Backups mit rsync
  auf einem lokalen NAS."

## Output (Kurz):

title: "Lokales Backup mit rsync und Cron" date: 2025-08-22 description: "Anleitung: rsync
einrichten, Cronjob hinzufügen, Tests und Restore überprüfen." tags: [backup, rsync, linux] draft:
true

---

TL;DR: ... (150–200 Wörter)

Outline:

- H2: Warum lokale Backups wichtig sind
- H2: Voraussetzungen
- H2: rsync Konfiguration
- H2: Cronjob anlegen und testen
- H2: Restore und Validierung

Usage Note:

- Save generated file as `src/content/blog/<slug>.mdx` and update frontmatter `draft` to `false`
  when ready to publish.
