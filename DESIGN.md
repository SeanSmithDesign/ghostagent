# Greenlight — Design Tokens

Applies to the `greenlight-permit` runtime repo. Keep one font and at most two weights.

## Preset

`refined-minimal`

## Typography

- **Family:** Plus Jakarta Sans
- **Weights:** 500 (regular body, UI), 700 (headings, emphasis)
- **Import:** Google Fonts via `next/font/google` with `subsets: ['latin']`, `display: 'swap'`

## Color

| Token | Hex | Usage |
| --- | --- | --- |
| Accent | `#2E7D48` | Primary CTAs, active states, progress, "go" signal |
| Surface | `#FAFAF7` | Page background |
| Ink | `#111614` | Primary text |
| Muted | `#6B736E` | Secondary text, meta |
| Line | `#E6E4DE` | Borders, separators |
| Warn | `#B7791F` | Blocker callouts, readiness warnings |
| Danger | `#9B2C2C` | Rejections, stop states |

Map these into Tailwind via `tailwind.config.ts` extending `theme.colors` and also expose as CSS variables in `globals.css` for shadcn:

```css
:root {
  --background: 60 16% 98%;     /* #FAFAF7 */
  --foreground: 150 12% 8%;      /* #111614 */
  --primary: 139 47% 33%;        /* #2E7D48 */
  --primary-foreground: 60 16% 98%;
  --muted: 150 6% 44%;           /* #6B736E */
  --border: 45 14% 89%;          /* #E6E4DE */
  --radius: 0.75rem;             /* 12px */
}
```

## Radius

`12px` (Tailwind `rounded-xl`) for cards, buttons, inputs. `9999px` for pills/badges.

## Spacing

- **Base:** 4px
- **Rule:** Use Tailwind defaults only. No arbitrary values (no `p-[13px]`).
- **Section vertical rhythm:** `py-24` desktop, `py-16` mobile.

## Motion

- **Library:** `framer-motion`
- **Default easing:** `[0.22, 1, 0.36, 1]` (gentle out)
- **Default duration:** `0.4s`
- **Staged timeline reveal:** sequential `stagger: 0.08` per step

## Components

Use shadcn primitives (`button`, `card`, `input`, `textarea`, `badge`, `progress`, `separator`, `dialog`, `sonner`, `tabs`). Do not hand-roll equivalents.

## Voice

- "Enabling humans to do more faster."
- Empower applicants AND inspectors.
- Never "disrupt bureaucracy" or "cut out humans."
