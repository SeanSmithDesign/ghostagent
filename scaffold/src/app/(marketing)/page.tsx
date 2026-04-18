import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, ClipboardCheck, CalendarCheck } from "lucide-react";
import { StagedTimeline } from "@/components/marketing/staged-timeline";
import { ReadinessMock } from "@/components/marketing/readiness-mock";
import { WaitlistForm } from "@/components/marketing/waitlist-form";

export default function LandingPage() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <HowItWorks />
      <TimelineSection />
      <ReadinessSection />
      <Pricing />
      <Waitlist />
    </main>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      <Badge variant="outline" className="mb-6 rounded-full">
        AI permit co-pilot for homeowners
      </Badge>
      <h1 className="text-balance text-5xl font-bold tracking-tight md:text-6xl">
        Get your remodel permit
        <br />
        right the first time.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        Describe your project. Greenlight reads the rules, flags what&apos;s missing,
        and walks you through every inspection — so your application lands green.
      </p>
      <div className="mt-10 flex items-center justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/app">Start my project</Link>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link href="#how-it-works">How it works</Link>
        </Button>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Enabling humans to do more faster — applicants and inspectors alike.
      </p>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Describe",
      body: "Tell Greenlight about your project in plain English. No forms, no code references.",
    },
    {
      icon: ClipboardCheck,
      title: "Review",
      body: "We match your scope to your city&apos;s rules and show a readiness score with fixable blockers.",
    },
    {
      icon: CalendarCheck,
      title: "Submit",
      body: "See every inspection stage before it happens. Submit with confidence.",
    },
  ];
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
        Three steps to a green light
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="p-8">
            <Icon className="mb-6 h-6 w-6 text-primary" aria-hidden />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Badge className="mb-4 rounded-full">The differentiator</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            See every inspection before it happens
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Most homeowners don&apos;t know what comes after approval. Greenlight maps
            the entire staged inspection journey — framing to final.
          </p>
        </div>
        <StagedTimeline />
      </div>
    </section>
  );
}

function ReadinessSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Readiness intelligence that compounds
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every blocker is specific and fixable. Every project sharpens the model
            for the next homeowner in your city.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3"><span className="text-primary">•</span> Live score, updated as you chat</li>
            <li className="flex gap-3"><span className="text-primary">•</span> Blockers grouped by severity</li>
            <li className="flex gap-3"><span className="text-primary">•</span> &ldquo;Fix with AI&rdquo; suggestions inline</li>
          </ul>
        </div>
        <ReadinessMock />
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
        Simple pricing
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card className="p-8">
          <h3 className="text-xl font-bold">Free</h3>
          <p className="mt-2 text-muted-foreground">Guided intake + readiness score.</p>
          <Separator className="my-6" />
          <ul className="space-y-2 text-sm">
            <li>Chat intake in plain English</li>
            <li>Live readiness score</li>
            <li>Inspection timeline preview</li>
          </ul>
          <Button asChild className="mt-8 w-full" variant="outline">
            <Link href="/app">Start free</Link>
          </Button>
        </Card>
        <Card className="border-primary p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Fast</h3>
            <Badge>$299–$499</Badge>
          </div>
          <p className="mt-2 text-muted-foreground">Expedited review + submit assistance.</p>
          <Separator className="my-6" />
          <ul className="space-y-2 text-sm">
            <li>Everything in Free</li>
            <li>Human review within 24 hours</li>
            <li>Submit on your behalf</li>
            <li>Inspection-day briefings</li>
          </ul>
          <Button asChild className="mt-8 w-full">
            <Link href="/app">Start Fast</Link>
          </Button>
        </Card>
      </div>
    </section>
  );
}

function Waitlist() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Join the waitlist
        </h2>
        <p className="mt-4 text-muted-foreground">
          We&apos;re launching in Austin first, then Bay Area, then all of California.
        </p>
        <div className="mt-8">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
