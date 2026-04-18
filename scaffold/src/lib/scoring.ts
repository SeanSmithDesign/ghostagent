import type { ProjectIntake, ReadinessResult, Blocker } from "@/types/project";
import { austinDeckRules } from "@/lib/rules/austin-deck";

const REQUIRED_FIELDS: Array<keyof ProjectIntake> = [
  "projectType",
  "dimensions",
  "jurisdiction",
  "structural",
  "electrical",
  "plumbing",
];

export function scoreIntake(intake: Partial<ProjectIntake>): ReadinessResult {
  const missingFields = REQUIRED_FIELDS.filter((f) => {
    const v = intake[f];
    if (f === "dimensions") return !v || !(v as { lengthFt?: number }).lengthFt;
    return v === undefined || v === null || v === "";
  }).map(String);

  const riskFlags = austinDeckRules.risks
    .filter((rule) => rule.triggers(intake))
    .map((r) => r.id);

  const raw = 100 - missingFields.length * 10 - riskFlags.length * 15;
  const score = Math.max(0, Math.min(100, raw));

  const blockers: Blocker[] = [
    ...missingFields.map<Blocker>((f) => ({
      id: `missing:${f}`,
      label: humanize(f),
      detail: `We need ${humanize(f).toLowerCase()} to evaluate your application.`,
      severity: "warn",
      fixable: true,
    })),
    ...austinDeckRules.risks
      .filter((rule) => rule.triggers(intake))
      .map<Blocker>((r) => ({
        id: `risk:${r.id}`,
        label: r.label,
        detail: r.detail,
        severity: "risk",
        fixable: r.fixable,
      })),
  ];

  return { score, missingFields, riskFlags, blockers };
}

function humanize(s: string) {
  return s.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}
