import { MapView } from '@/components/MapTransparency/MapView';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
  onDecide: (decision: 'safe' | 'unsure' | 'unprepared') => void;
};

export const IncompleteMapView = ({ onDecide }: Props) => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Map or Reality? — Philippine Landmark Map Transparency Demo</h1>
      <p className="text-muted-foreground mb-6">Screen 1 — Incomplete Map View</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <MapView height={420} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Intramuros, Manila</CardTitle>
            <CardDescription>
              ★ 4.6 • Open 8:00–20:00
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Historic walled city with Spanish colonial architecture. Popular destinations include Fort Santiago and the Manila Cathedral.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-muted h-20 rounded" />
              <div className="bg-muted h-20 rounded" />
              <div className="bg-muted h-20 rounded" />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Important limitation: Typical maps omit on-site details like walking distance inside the site, stairs/elevation changes, surface conditions, heat/shade/rest areas, and safety or accessibility notes.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button variant="default" className="w-full" onClick={() => onDecide('safe')}>I can plan safely</Button>
              <Button variant="secondary" className="w-full" onClick={() => onDecide('unsure')}>Not sure</Button>
              <Button variant="outline" className="w-full" onClick={() => onDecide('unprepared')}>I would not be prepared</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IncompleteMapView;
