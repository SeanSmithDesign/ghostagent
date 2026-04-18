# Greenlight — Strategic Brief

**Date:** 2026-04-18
**Author:** Sean Smith (handed off via Claude Code web session)
**Status:** Locked, approved. Do not re-litigate the decisions below.

---

## One-line

Greenlight is an AI permit co-pilot for homeowners doing remodels. **TurboTax for home remodel permits.** A consumer wedge underneath PermitFlow (contractor-focused, ~$500M valuation).

## Positioning

> "Enabling humans to do more faster."

Frame the product as empowering **both applicants and inspectors**. Explicitly reject "disrupting bureaucracy" and "cutting out the humans" framing. Aligns with the California state AI permitting initiative (Newsom, April 2025 post-LA fires).

| Internal framing | Public framing |
| --- | --- |
| "Disrupting bureaucracy" | "Enabling humans to do more faster" |
| "Cutting out inspectors" | "Empowering applicants AND inspectors" |
| "Rejection data moat" | "Readiness intelligence that compounds" |

## Concept selection

- **Chosen:** B2C homeowner wedge for mid-sized remodels (kitchen, bath, deck, ADU, garage conversion).
- **Rejected:** Contractor-facing SaaS (PermitFlow already owns this); geographic emerging-markets play (not VC-returnable at this scale); physical robotics (not aligned with founder strengths).
- **Why it wins:** PermitFlow proves VC appetite for the category but serves contractors. 10M+ homeowners/yr remodel with no expert to call. Consumer wedge is open.

## Problem

- 10M+ remodels/yr in the US.
- ~60% of first-submission permit applications are rejected.
- Homeowners have no expert, no software, no clear path. They call the city and wait.
- Inspectors are overloaded; rejections are a tax on everyone.

## Product (demo scope)

One jurisdiction (Austin), one project type (deck). Do NOT generalize today.

Core flow:

1. **Describe project** — chat intake extracts type, dimensions, jurisdiction, structural/electrical/plumbing flags, photos.
2. **Rules surface** — Austin-specific deck rules load.
3. **Staged inspection timeline** — horizontal stepper: framing → rough electrical → rough plumbing → insulation → drywall → final. Sequential reveal (framer-motion). **This is the differentiator screen.**
4. **Readiness score** — 0–100 with blocker list and "fix with AI" buttons.
5. **Mock submit** — dialog with fake tracking number.

## Data moat (compounding)

Four layers, listed shallowest → deepest:

1. **Jurisdictional rules** — medium moat, time advantage.
2. **Permit history** — low moat, purchasable.
3. **Rejection patterns** — high moat, proprietary, compounds with usage.
4. **Inspector behavior** — highest moat, unbuyable.

California is the wedge: 480 cities/counties, state digitization push, LA rebuild urgency.

## Business model

- Free tier: guided intake + readiness score.
- **Base:** $99–$199 per project.
- **Fast:** $299–$499 per project (expedited readiness review, submit assistance).

## Market

- $2B consumer permit assistance TAM (homeowner-side only).
- Adjacent: contractor SaaS ($500M+, PermitFlow territory), city software (Accela), home services marketplaces (Angi).

## Competitive landscape

- **PermitFlow** — contractor workflow. Doesn't serve the homeowner.
- **Accela / Tyler** — city-side software. Not a homeowner product.
- **Angi / Houzz** — lead gen and marketplace. No permit workflow.
- **ChatGPT** — general, not jurisdictionally grounded.

## Demo strategy

Two parts, either standalone defensible.

- **Part A — web product.** Rock-solid flow: landing → chat → readiness → timeline → mock submit.
- **Part B — AI walkthrough video.** 20–30s MP4 with UX overlay ("teledoc hero moment"). Sean owns this locally.

No live camera demo. No live home tour. Pre-rendered only.

Video generation priority: Seedance 2.0 → Runway Gen-4 → Sora → Veo 3.

## Deck outline (10–12 slides, Sean writes locally)

Title → Problem → Insight → Product → Hero demo video → Why now → Business model → Market → Competitive → Vision → Team/ask → Appendix.

## Sensitivity

Nothing confidential. Safe to share with teammates. Keep "enabling humans" framing in any VC-facing copy.
