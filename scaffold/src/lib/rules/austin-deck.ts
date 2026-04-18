import type { InspectionStage, ProjectIntake } from "@/types/project";

export interface RiskRule {
  id: string;
  label: string;
  detail: string;
  fixable: boolean;
  triggers: (intake: Partial<ProjectIntake>) => boolean;
}

export interface JurisdictionRules {
  jurisdiction: string;
  projectType: "deck";
  stages: InspectionStage[];
  risks: RiskRule[];
  narrative: string;
}

export const austinDeckRules: JurisdictionRules = {
  jurisdiction: "Austin, TX",
  projectType: "deck",
  narrative:
    "City of Austin residential deck permits follow the 2021 IRC with Austin amendments. Decks over 30\" above grade trigger guardrail and footing inspections. Any structural tie-in to the home requires a sealed structural letter.",
  stages: [
    {
      id: "framing",
      order: 1,
      title: "Framing",
      description: "Ledger attachment, joist span, beam sizing, post-to-beam connection.",
      requires: ["structural letter if attached to house", "joist layout diagram"],
    },
    {
      id: "rough-electrical",
      order: 2,
      title: "Rough electrical",
      description: "Outlets, GFCI protection, outdoor-rated boxes.",
      requires: ["electrical plan"],
    },
    {
      id: "rough-plumbing",
      order: 3,
      title: "Rough plumbing",
      description: "Only if water features, outdoor kitchen, or drainage connections.",
      requires: ["plumbing plan if applicable"],
    },
    {
      id: "insulation",
      order: 4,
      title: "Insulation",
      description: "N/A for standard decks. Required if covered deck with conditioned space below.",
      requires: [],
    },
    {
      id: "drywall",
      order: 5,
      title: "Drywall",
      description: "N/A for standard decks. Required if enclosed structure.",
      requires: [],
    },
    {
      id: "final",
      order: 6,
      title: "Final inspection",
      description: "Guardrails, stair geometry, finish grade, drainage.",
      requires: ["as-built drawing"],
    },
  ],
  risks: [
    {
      id: "over-30in-no-guardrail",
      label: "Deck over 30\" above grade",
      detail: "Austin requires 36\" guardrails and intermediate balusters ≤ 4\" apart for decks more than 30\" above finished grade.",
      fixable: true,
      triggers: (i) => (i.dimensions?.heightFt ?? 0) * 12 > 30,
    },
    {
      id: "structural-no-letter",
      label: "Structural attachment to house",
      detail: "A sealed structural letter is required when the deck is attached to the house.",
      fixable: true,
      triggers: (i) => !!i.structural,
    },
    {
      id: "electrical-no-gfci",
      label: "Outdoor electrical without GFCI note",
      detail: "Outdoor outlets must be GFCI-protected and in weather-resistant enclosures.",
      fixable: true,
      triggers: (i) => !!i.electrical,
    },
    {
      id: "plumbing-scope-unclear",
      label: "Plumbing scope unclear",
      detail: "If plumbing is involved, provide a simple one-line drain diagram.",
      fixable: true,
      triggers: (i) => !!i.plumbing,
    },
    {
      id: "footprint-over-200sqft",
      label: "Footprint > 200 sqft",
      detail: "Decks over 200 sqft require soil/footing documentation.",
      fixable: true,
      triggers: (i) => {
        const d = i.dimensions;
        if (!d?.lengthFt || !d?.widthFt) return false;
        return d.lengthFt * d.widthFt > 200;
      },
    },
  ],
};
