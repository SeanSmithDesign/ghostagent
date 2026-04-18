"use client";

import { motion } from "framer-motion";
import { austinDeckRules } from "@/lib/rules/austin-deck";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export function StagedTimeline() {
  const stages = austinDeckRules.stages;

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-10 hidden h-px bg-border md:block" />
      <ol className="grid gap-4 md:grid-cols-6">
        {stages.map((stage, i) => (
          <motion.li
            key={stage.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="relative h-full p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Stage {stage.order}
                </span>
              </div>
              <h3 className="text-base font-bold">{stage.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {stage.description}
              </p>
            </Card>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
