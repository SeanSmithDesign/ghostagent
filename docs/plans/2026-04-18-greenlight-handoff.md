# Greenlight — Session Handoff (Local CLI → Web)

**Date:** 2026-04-18
**Source:** Claude Code (local CLI on Sean's laptop)
**Destination:** Claude Code on claude.ai/code (web)
**Branch:** `claude/greenlight-hackathon-handoff-dH3ar`

## Why this document exists

Sean ran out of laptop time and handed off to a web Claude Code session. The web session is scoped to **`seansmithdesign/ghostties-planning`**, not `greenlight-permit`, and has no `gh`/`vercel`/`supabase` CLIs. So the web session cannot scaffold the runtime repo or deploy it.

Instead, the web session's job is to:

1. Version the strategic brief and tactical build plan in `docs/plans/` so teammates can read them.
2. Produce a `scaffold/` directory with copy-ready code stubs for the `greenlight-permit` repo (landing page, chat API route, readiness logic, staged timeline component, rules, scoring, Supabase migration).
3. Publish a `DESIGN.md` at the root with tokens.

Sean's laptop or a teammate can then:

- Run the `create-next-app` + `gh repo create` + `vercel link` block from the build plan.
- Copy `scaffold/*` from this planning repo into `greenlight-permit`.
- Deploy.

## What's in this repo now

- `DESIGN.md` — design tokens (root).
- `docs/plans/2026-04-18-greenlight-strategic-brief.md` — strategy (locked).
- `docs/plans/2026-04-18-greenlight-build-plan.md` — tactical build plan.
- `docs/plans/2026-04-18-greenlight-handoff.md` — this file.
- `scaffold/` — copy-ready stubs for the runtime repo.

## Sandbox constraints discovered

| Tool | Available here? |
| --- | --- |
| `node` / `npm` / `npx` | ✅ (22.22.2 / 10.9.7) |
| `gh` | ❌ |
| `vercel` | ❌ |
| `supabase` | ❌ |
| GitHub MCP (scope: `seansmithdesign/ghostties-planning`) | ✅ |

So scaffolding, deploying, and creating the Supabase project must happen on the laptop.

## Open questions (from handoff)

- Team composition (team of strangers, 9am standup)
- Seedance 2.0 API quota availability — Runway is backup
- In-person vs online hackathon
- Exact VC pitch format (5 min vs 3 min, Q&A)
- Demo jurisdiction — build plan says Austin deck; SF or Oakland deck might land better locally

## Framing guardrails

Keep "enabling humans to do more faster" in any VC-facing copy. Avoid "disrupting bureaucracy" and "cutting out inspectors."
