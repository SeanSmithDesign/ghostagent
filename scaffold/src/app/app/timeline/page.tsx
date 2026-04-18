"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { austinDeckRules } from "@/lib/rules/austin-deck";
import { CheckCircle2 } from "lucide-react";

export default function TimelinePage() {
  const [submitted, setSubmitted] = useState(false);
  const trackingNumber = "AUS-2026-DK-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-start justify-between">
        <div>
          <Badge variant="outline" className="rounded-full">
            {austinDeckRules.jurisdiction} · Deck
          </Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Your inspection journey
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Every stage an Austin deck permit goes through — from framing to final.
            Know what&apos;s coming before it&apos;s on your doorstep.
          </p>
        </div>
      </div>

      <ol className="mt-12 space-y-4">
        {austinDeckRules.stages.map((stage, i) => (
          <motion.li
            key={stage.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="flex items-start gap-5 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {stage.order}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{stage.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stage.description}
                </p>
                {stage.requires.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {stage.requires.map((r) => (
                      <li key={r}>
                        <Badge variant="secondary">{r}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </motion.li>
        ))}
      </ol>

      <div className="mt-10 flex justify-end gap-3">
        <Button asChild variant="outline">
          <Link href="/app/readiness">Back to readiness</Link>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Submit application</Button>
          </DialogTrigger>
          <DialogContent>
            {!submitted ? (
              <>
                <DialogHeader>
                  <DialogTitle>Submit to Austin DSD?</DialogTitle>
                  <DialogDescription>
                    We&apos;ll package your intake, readiness notes, and inspection plan
                    for the City of Austin Development Services Department.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => setSubmitted(true)}>Submit</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
                    Submitted
                  </DialogTitle>
                  <DialogDescription>
                    Tracking number:
                    <span className="ml-2 font-mono font-bold text-foreground">
                      {trackingNumber}
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll notify you as each inspection stage opens up.
                </p>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
