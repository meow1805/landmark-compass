import type { HiddenCondition } from '@/types/exhibit';
import { ArrowUpFromLine, MapPin, Armchair, Sun, AlertTriangle, Car, Heart } from 'lucide-react';

interface SolutionMapProps {
  landmarkName: string;
  conditions: HiddenCondition[];
}

const typeToIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  stairs: ArrowUpFromLine,
  distance: MapPin,
  seating: Armchair,
  shade: Sun,
  accessibility: AlertTriangle,
  transport: Car,
};

const typeToLabel: Record<string, string> = {
  stairs: 'Stairs / steps',
  distance: 'Long walk',
  seating: 'Rest area',
  shade: 'Shade / sun',
  accessibility: 'Accessibility',
  transport: 'Parking / transport',
};

export function SolutionMap({ landmarkName, conditions }: SolutionMapProps) {
  return (
    <div className="solution-map">
      <div className="solution-map-header">
        <Heart className="w-5 h-5 text-primary shrink-0" />
        <div>
          <div className="font-semibold text-foreground">Complete map: what everyone should see</div>
          <div className="text-xs text-muted-foreground">{landmarkName} — hazards, rest areas, and safety info</div>
        </div>
      </div>
      <div className="solution-map-paper">
        <div className="solution-map-simple">
          <div className="solution-map-placeholder">
            <MapPin className="w-10 h-10 text-muted-foreground/60" />
            <span className="text-sm font-medium text-muted-foreground">{landmarkName}</span>
          </div>
          <ul className="solution-map-legend">
            {conditions.map((c) => {
              const Icon = typeToIcon[c.type] ?? AlertTriangle;
              const label = typeToLabel[c.type] ?? c.type;
              return (
                <li key={c.id} className="solution-map-legend-item">
                  <Icon className="w-4 h-4 shrink-0 text-foreground" />
                  <span>{c.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Maps that show stairs, distances, rest areas, and hazards help everyone plan safely. Your reports can make public maps more complete.
      </p>
    </div>
  );
}
