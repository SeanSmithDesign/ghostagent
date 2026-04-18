"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Sparkles } from "lucide-react";
import type { ProjectIntake, ReadinessResult } from "@/types/project";

export default function ReadinessPage() {
  const [intake, setIntake] = useState<Partial<ProjectIntake> | null>(null);
  const [result, setResult] = useState<ReadinessResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("greenlight:intake");
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<ProjectIntake>;
    setIntake(parsed);
    fetch("/api/readiness", {
      method: "POST",
      body: JSON.stringify(parsed),
    })
      .then((r) => r.json())
      .then(setResult);
  }, []);

  if (!intake || !result) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm text-muted-foreground">Calculating readiness…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Card className="p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Your readiness score</p>
            <p className="mt-1 text-6xl font-bold">{result.score}</p>
          </div>
          <Badge variant="outline" className="rounded-full">
            {intake.jurisdiction ?? "—"} · {intake.projectType ?? "project"}
          </Badge>
        </div>
        <Progress value={result.score} className="mt-6" />
      </Card>

      <h2 className="mt-10 text-xl font-bold">Blockers to fix</h2>
      <ul className="mt-4 space-y-3">
        {result.blockers.length === 0 && (
          <Card className="p-4 text-sm text-muted-foreground">
            No blockers detected. You&apos;re green to submit.
          </Card>
        )}
        {result.blockers.map((b) => (
          <Card key={b.id} className="flex items-start gap-4 p-4">
            <AlertTriangle
              className={
                b.severity === "risk"
                  ? "mt-0.5 h-5 w-5 text-destructive"
                  : "mt-0.5 h-5 w-5 text-primary"
              }
              aria-hidden
            />
            <div className="flex-1">
              <p className="font-bold">{b.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{b.detail}</p>
            </div>
            {b.fixable && (
              <Button size="sm" variant="secondary" className="gap-2">
                <Sparkles className="h-4 w-4" aria-hidden />
                Fix with AI
              </Button>
            )}
          </Card>
        ))}
      </ul>

      <div className="mt-10 flex justify-end gap-3">
        <Button asChild variant="outline">
          <Link href="/app">Refine intake</Link>
        </Button>
        <Button asChild>
          <Link href="/app/timeline">See inspection timeline</Link>
        </Button>
      </div>
    </main>
  );
}
