"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectIntake } from "@/types/project";

type Message = { role: "user" | "assistant"; content: string };

const INITIAL: Message[] = [
  {
    role: "assistant",
    content:
      "Hi — I'm Greenlight. Tell me about the project you want to permit. What are you building, and where?",
  },
];

export default function ChatIntakePage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);

  async function send() {
    if (!draft.trim()) return;
    const next: Message[] = [...messages, { role: "user", content: draft }];
    setMessages(next);
    setDraft("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: next }),
      });
      if (!res.body) throw new Error("no stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value);
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }

      const intake = extractIntake(acc);
      if (intake) {
        sessionStorage.setItem("greenlight:intake", JSON.stringify(intake));
        router.push("/app/readiness");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold">Let&apos;s scope your project</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Answer a few plain-English questions. We&apos;ll build your readiness score live.
      </p>

      <div className="mt-8 space-y-4">
        {messages.map((m, i) => (
          <Card
            key={i}
            className={m.role === "assistant" ? "bg-muted/40 p-4" : "p-4"}
          >
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {m.role === "assistant" ? "Greenlight" : "You"}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm">{m.content}</p>
          </Card>
        ))}
      </div>

      <form
        className="mt-8 flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="A 16 by 12 deck off the back of my house in Austin…"
          disabled={pending}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={pending || !draft.trim()}>
            {pending ? "Thinking…" : "Send"}
          </Button>
        </div>
      </form>
    </main>
  );
}

function extractIntake(text: string): ProjectIntake | null {
  const match = text.match(/```json\s*([\s\S]*?)```/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]) as ProjectIntake;
  } catch {
    return null;
  }
}
