# `cv-print.json` — Editing guide (for humans and AI)

This file is the **single source of content** for the printable one-page résumé at `/cv`.
Edit only this file to change the CV — never touch `app/cv/page.tsx` (it only handles
layout, styling, and the A4 / PDF print logic).

## Hard rule: keep it to ONE A4 page

The `/cv` page must always print to a **single A4 page**. The current content fills the page.
When editing, **keep the total volume roughly the same** — if you add a bullet or section,
trim another. After meaningful edits, verify the print preview is still one page
(open `/cv`, click "Save as PDF").

Rough capacity budget that fits one page: ~1 summary paragraph (≤4 lines), ~10 skill tags,
2 short inline lists, ~3–4 experience/education bullets total per entry, and the small
"Additional Information" block. Going much beyond this will spill to a second page.

## Top-level shape

```jsonc
{
  "profile": {
    "name": "Full Name",
    "headline": "Role / title under the name",
    "contacts": ["City", "email", "website"]   // joined with " | " in the header
  },
  "summary": "One short paragraph.",            // optional; omit or "" to hide
  "sections": [ /* rendered top-to-bottom, in array order */ ]
}
```

To **reorder** sections, reorder the objects in `sections`. To **remove** a section,
delete its object. To **add** one, insert an object using one of the `kind`s below.

## Section kinds

Every section object has a `"heading"` (the uppercase title) and a `"kind"` that picks
how its content renders. Optional `"tightTop": true` reduces the gap above the heading.

| `kind`        | Content field | Item shape | Renders as |
|---------------|---------------|------------|------------|
| `tag-grid`    | `items`       | `string`   | 2-column bulleted grid (good for skills) |
| `inline-list` | `items`       | `string`   | one line, items joined with ` • ` |
| `bullets`     | `items`       | `{ "lead"?: string, "text": string }` | bullet list; `lead` is bolded inline before `text` |
| `labeled`     | `items`       | `{ "label": string, "text": string }` | bullet list; `label` bolded, then `text` |
| `entries`     | `entries`     | see below  | experience / education blocks |

### `entries` item shape

```jsonc
{
  "title":  "Company or Program (bold, left)",
  "period": "Start - End (bold, right)",
  "subtitle": "Institution line (optional, plain, no indent)",
  "bullets": ["Indented bullet", "..."],   // optional
  "text":    "Indented paragraph"          // optional; use instead of bullets
}
```

An entry shows `subtitle` first (if present), then `bullets` (if present), then `text`.
Use `bullets` for multi-point roles, `text` for a single-sentence description.

## Notes

- `&` and other characters can be written literally in JSON (e.g. `"Programming & Tools"`).
- The header contact line and `inline-list` separators are added by the renderer — just
  provide the raw strings, no `|` or `•`.
