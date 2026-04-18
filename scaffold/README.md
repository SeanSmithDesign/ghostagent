# Greenlight — Scaffold

Copy-ready stubs for `greenlight-permit` (Next.js 15 App Router + TS + Tailwind + shadcn + Supabase).

This directory lives inside the `ghostties-planning` repo because the web Claude Code session that authored it can't create the runtime repo directly. Everything below is meant to be copied into a freshly scaffolded `greenlight-permit` Next.js project.

## 1. Scaffold the runtime repo (on Sean's laptop)

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

## 2. Copy this scaffold in

From the root of the `ghostties-planning` repo:

```bash
rsync -av --exclude README.md scaffold/ ~/Code/greenlight-permit/
```

This overwrites `src/app/layout.tsx`, `src/app/globals.css`, and adds everything under `src/app/(marketing)/`, `src/app/app/`, `src/app/api/`, `src/components/marketing/`, `src/lib/`, `src/types/`, plus `supabase/migrations/0001_init.sql` and `.env.example`.

## 3. Supabase

```bash
cd ~/Code/greenlight-permit
supabase init
supabase link --project-ref <your-ref>
supabase db push
```

Then paste the URL and anon key into `.env.local` (and into Vercel env).

## 4. Run

```bash
npm run dev
```

- `/` — landing page (hero, how it works, **staged timeline**, readiness mock, pricing, waitlist)
- `/app` — chat intake, streams Claude Sonnet responses, stores JSON intake in sessionStorage
- `/app/readiness` — score + blockers (scoring from `src/lib/scoring.ts`, rules from `src/lib/rules/austin-deck.ts`)
- `/app/timeline` — staged inspection timeline + mock submit dialog

## 5. Demo fallback

If chat breaks at 6:55pm, type this into the intake to get a clean state:

> "16 by 12 attached deck in Austin, about 2 feet off the ground, with outdoor outlets. No plumbing."

That exercises:
- `over-30in-no-guardrail` (height 2 ft = 24" — won't trigger; adjust to 3 ft for demo)
- `structural-no-letter` (attached ✓)
- `electrical-no-gfci` (outlets ✓)
- `footprint-over-200sqft` (16 × 12 = 192 — won't trigger; use 16 × 14 for demo)

For the 7pm pitch demo, use: **"16 by 14 attached deck in Austin, 3 feet off the ground, outdoor outlets and a hose bib."** That triggers all four main risks and lands the score around 40, making the "fix with AI" buttons actually compelling.

## 6. Cut list (if behind at 3pm)

See `docs/plans/2026-04-18-greenlight-build-plan.md` in the planning repo.

## 7. Never cut

Hero, readiness score, staged timeline, demo video.
