import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function ReadinessMock() {
  return (
    <Card className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Readiness</p>
          <p className="mt-1 text-4xl font-bold">82</p>
        </div>
        <Badge variant="outline" className="rounded-full">
          Austin, TX · Deck
        </Badge>
      </div>
      <Progress value={82} className="mt-4" />
      <ul className="mt-6 space-y-3 text-sm">
        <li className="flex items-start justify-between gap-4 rounded-xl border p-3">
          <span>Structural letter needed (attached to house)</span>
          <Badge variant="secondary">Fix with AI</Badge>
        </li>
        <li className="flex items-start justify-between gap-4 rounded-xl border p-3">
          <span>GFCI note missing on outdoor outlets</span>
          <Badge variant="secondary">Fix with AI</Badge>
        </li>
        <li className="flex items-start justify-between gap-4 rounded-xl border p-3">
          <span>Footprint {">"} 200 sqft — add soil note</span>
          <Badge variant="secondary">Fix with AI</Badge>
        </li>
      </ul>
    </Card>
  );
}
