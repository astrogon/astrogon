# Prompt: mdx-component-scaffold

Ziel / Intent Scaffold eine wiederverwendbare React‑Component für MDX mit TypeScript‑Typen, Default
Props und einem kurzen Usage‑Snippet für MDX und Storybook.

Kontext Repo verwendet React 18 in Island‑Components; Komponenten liegen unter `src/components/`.

Inputs

- component_name: PascalCase Name (z. B. `Callout`)
- props: Liste von Props mit Typwünschen (z. B. `title: string`, `variant?: 'info'|'warn'`)
- minimal_styles (optional): z. B. use Tailwind classes or CSS module

Erwartete Ausgabe

- `src/components/<ComponentName>.tsx` mit typed props und defaultProps
- kurzer Storybook snippet (optional/file `src/components/<ComponentName>.stories.tsx`)
- MDX usage example (1–2 Zeilen) für `src/content/…`

Constraints

- Keine heavy runtime deps; prefer pure React + Tailwind.
- Accessibility: prüfe ARIA wenn nötig.
- Keep file minimal and idiomatic to repo conventions (TSX, exports default).

Beispiel (Kurz) Input: component_name=Callout, props: {title: string, children: ReactNode, variant?:
'info'|'warn'}

Output: `Callout.tsx` export default function Callout({title, children, variant='info'}: Props) {
return (<aside className={...}>...</aside>)}
