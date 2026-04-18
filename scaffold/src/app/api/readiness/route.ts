import { NextResponse } from "next/server";
import { scoreIntake } from "@/lib/scoring";
import type { ProjectIntake } from "@/types/project";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const intake = (await req.json()) as Partial<ProjectIntake>;
  const result = scoreIntake(intake);
  return NextResponse.json(result);
}
