"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    setPending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("waitlist").insert({ email });
      if (error && !error.message.includes("duplicate")) throw error;
      toast.success("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-md gap-2">
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email address"
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Adding…" : "Join waitlist"}
      </Button>
    </form>
  );
}
