# Greenlight — Tactical Build Plan

**Date:** 2026-04-18 (hackathon day: 9a–7p, Oakland; pitch at 7pm)
**Target repo:** `gh:SeanSmithDesign/greenlight-permit` (public, to be created)
**Companion:** `2026-04-18-greenlight-strategic-brief.md`

> This plan is written for execution in the `greenlight-permit` repo on Sean's laptop. This repo (`ghostties-planning`) is a planning-only mirror and cannot host the runtime app.

---

## Time budget

| Time | Milestone |
| --- | --- |
| 09:30 | Repo live, Vercel deployed |
| 10:15 | Landing wireframe locked |
| 11:30 | Chat streaming end-to-end |
| 12:30 | Landing deployed |
| 13:30 | Readiness score working |
| 15:00 | Timeline viz done |
| 16:30 | Demo video MP4 exported |
| 17:30 | Deck v1 done |
| 18:00 | Full rehearsal |
| 19:00 | Pitch |

## Cut list (if behind at 3pm — cut in this order)

1. Real mock-submit → static success screen
2. Multiple jurisdictions → Austin only
3. Photo upload → chat-only intake
4. Supabase → in-memory state
5. Waitlist form → static email link

**Never cut:** hero, readiness score, staged inspection timeline, demo video.

---

## 1. Scaffold

Run on Sean's laptop (not in web session — CLIs unavailable here).

```bash
cd ~/Code
npx create-next-app@latest greenlight-permit \
  --typescript --tailwind --app --src-dir \
  --import-alias "@/*" --no-eslint
cd greenlight-permit
npx shadcn@latest init -d
npx shadcn@latest add button card input textarea badge progress separator dialog sonner tabs
npm i @anthropic-ai/sdk @supabase/supabase-js @supabase/ssr \
  lucide-react framer-motion zod react-hook-form @hookform/resolvers date-fns
gh repo create greenlight-permit --public --source=. --remote=origin --push
vercel link && vercel env pull .env.local
```

Then copy the contents of `scaffold/` from this planning repo into the new `greenlight-permit` repo (see `scaffold/README.md`).

## 2. Folder structure

```
src/
  app/
    (marketing)/page.tsx         # landing
    app/
      page.tsx                   # chat intake
      readiness/page.tsx         # scorecard
      timeline/page.tsx          # staged inspection timeline
    api/
      chat/route.ts              # Claude streaming
      readiness/route.ts         # score computation
  components/
    marketing/
    app/
    ui/                          # shadcn output
  lib/
    claude.ts
    supabase/client.ts
    supabase/server.ts
    rules/austin-deck.ts
    scoring.ts
  types/project.ts
supabase/
  migrations/0001_init.sql
```

## 3. Data

### Supabase migration (`supabase/migrations/0001_init.sql`)

```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  scope text,
  jurisdiction text,
  readiness int,
  status text default 'draft'
);

create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);
```

Push with `supabase db push` after `supabase link`.

### Scoring

```
score = 100 − (missing_fields × 10) − (risk_flags × 15)
```

Clamp to `[0, 100]`. Lives in `src/lib/scoring.ts`.

### Chat intake

Streaming Claude call. System prompt extracts:

- `project_type` (deck | kitchen | bath | ADU | garage)
- `dimensions` (length × width × height, feet)
- `jurisdiction` (city, state)
- `structural` (bool)
- `electrical` (bool)
- `plumbing` (bool)
- `photos` (array of URLs)

After 4–6 turns, return JSON → store in `projects` → push to `/app/readiness`.

## 4. Build order (priority)

1. Landing page (`src/app/(marketing)/page.tsx`) — 6 sections:
   1. Hero
   2. How it works (3 steps)
   3. **Staged inspection timeline** — HERO of the page
   4. Readiness mockup
   5. Pricing (Free + Fast)
   6. Waitlist email form
2. Supabase project + migration
3. Chat intake + streaming Claude API route
4. Readiness scorecard (progress ring + blocker list + "fix with AI")
5. Staged inspection timeline (horizontal stepper, framer-motion sequential reveal) — differentiator
6. Mock submit dialog with fake tracking number

## 5. Design tokens

See `DESIGN.md` at repo root. Highlights:

- Font: Plus Jakarta Sans (one font, two weights max)
- Accent: `#2E7D48`
- Surface: `#FAFAF7`
- Radius: `12px`
- Spacing: 4px base, Tailwind defaults only (no arbitrary values)

## 6. Constraints

- Designer-first: make confident technical decisions without asking.
- Use shadcn primitives. Don't hand-roll components.
- No tests today (hackathon exception).
- Don't touch video generation or deck writing — Sean owns those locally.
- One jurisdiction (Austin), one project type (deck). Do NOT generalize.
