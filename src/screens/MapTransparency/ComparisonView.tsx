import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type Props = {
  decision: 'safe' | 'unsure' | 'unprepared';
};

const Row = ({ label, typical, improved }: { label: string; typical: string; improved: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start py-2 border-b">
    <div className="font-medium">{label}</div>
    <div className="text-sm text-muted-foreground">{typical}</div>
    <div className="text-sm">{improved}</div>
  </div>
);

export const ComparisonView = ({ decision }: Props) => {
  const decisionText =
    decision === 'safe' ? 'I can plan safely' : decision === 'unsure' ? 'Not sure' : 'I would not be prepared';

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-semibold mb-2">Screen 3 — Comparison View</h2>
      <p className="text-muted-foreground mb-6">Clear visual comparison of typical vs improved information</p>

      <Card>
        <CardHeader>
          <CardTitle>Your decision: {decisionText}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
            <div className="font-semibold">Comparison</div>
            <div className="font-semibold">Typical Map Information</div>
            <div className="font-semibold">Improved Map Information</div>
          </div>

          <Row
            label="Visibility of physical effort"
            typical="Not shown (distance, stairs missing)"
            improved="Shown (distance estimate, stairs presence, slopes)"
          />
          <Row
            label="Heat and rest awareness"
            typical="Not shown (shade, seating unknown)"
            improved="Shown (midday heat warning, seating clusters)"
          />
          <Row
            label="Safety clarity"
            typical="Generic; site-level safety only"
            improved="Contextual notes; caution areas identified"
          />
          <Row
            label="Risk of unexpected conditions"
            typical="Higher (surfaces and bottlenecks hidden)"
            improved="Lower (surfaces and narrow paths disclosed)"
          />
          <Row
            label="Planning confidence"
            typical="Uncertain for many visitors"
            improved="Higher; supports fairer access decisions"
          />

          <p className="mt-6 text-sm">
            “The place did not change. Only the information did.”
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-sm mb-3">Call to Action</p>
        <a
          className="inline-block px-4 py-2 rounded bg-primary text-primary-foreground"
          href="https://forms.gle/example"
          target="_blank"
          rel="noreferrer"
        >
          Report missing map information
        </a>
        <p className="mt-2 text-xs text-muted-foreground">Button/QR placeholder linking to a Google Form</p>
      </div>
    </div>
  );
};

export default ComparisonView;
