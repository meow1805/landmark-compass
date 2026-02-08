import { MapView } from '@/components/MapTransparency/MapView';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

type Props = {
  onCompare: () => void;
};

export const ImprovedMapView = ({ onCompare }: Props) => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-semibold mb-2">Screen 2 — Improved Map View</h2>
      <p className="text-muted-foreground mb-6">Same map, with expanded information panels</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <MapView height={420} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Intramuros — Information Panels</CardTitle>
            <CardDescription>Expanded conditions to support informed planning</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="effort">
                <AccordionTrigger>Physical Effort</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Estimated walking distance: 1.5–2.5 km across typical points</li>
                    <li>Presence of stairs: Multiple stairways at Fort Santiago and wall walks</li>
                    <li>Uneven/inclined surfaces: Cobblestones and ramps with variable slope</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="route">
                <AccordionTrigger>Route Conditions</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Surface types: stone/cobblestone, concrete, mixed</li>
                    <li>Narrow paths/bottlenecks: Gate areas and wall access points</li>
                    <li>Areas requiring caution: Uneven stones; watch footing after rain</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="heat">
                <AccordionTrigger>Heat & Rest (PH Context)</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Shade availability: Limited on midday wall walks</li>
                    <li>Seating/rest points: Clusters near museums; sparse along routes</li>
                    <li>Heat exposure warning: Plan for high UV between 10:00–15:00</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="safety">
                <AccordionTrigger>Safety & Planning</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Visitor suitability: Challenging for mobility aids on cobblestones</li>
                    <li>Exit clarity: Main gates well-marked; side passages vary</li>
                    <li>Best visiting time: Morning or late afternoon for cooler conditions</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p className="text-xs text-muted-foreground mt-4">
              Disclaimer: This heritage site retains original features. Information is provided to support informed planning.
            </p>

            <div className="mt-6">
              <Button onClick={onCompare}>Compare with Typical Map</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImprovedMapView;
