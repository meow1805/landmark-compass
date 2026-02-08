import type { Persona } from '@/types/exhibit';
import { MapPin, CloudRain, ArrowUpFromLine, Armchair, AlertTriangle, HelpCircle } from 'lucide-react';

interface KnowledgeMapProps {
  persona: Persona;
  landmarkName: string;
  rain: boolean;
  /** How many obstacles are still ahead (not yet revealed). */
  obstaclesAhead: number;
}

export function KnowledgeMap({ persona, landmarkName, rain, obstaclesAhead }: KnowledgeMapProps) {
  const level = persona.mapKnowledge;

  return (
    <div className="exhibit-card h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="font-semibold text-sm">What {persona.name} knows</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        {level === 'high' && 'Familiar with the area. Knows spots to avoid and where to rest.'}
        {level === 'medium' && 'Some experience. May have heard about long walks or stairs.'}
        {level === 'low' && 'Only what the map shows: location, hours, and ticket price.'}
      </p>

      {/* Mini "map" representation: what's visible to this persona */}
      <div className="flex-1 min-h-0 rounded-lg bg-muted/50 p-3 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-medium text-foreground">{landmarkName}</span>
        </div>
        <div className="space-y-1.5">
          {/* Always visible: basic info */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Location • Hours • Ticket price</span>
          </div>

          {/* Medium+: vague awareness */}
          {(level === 'medium' || level === 'high') && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Possible long walks or uneven paths</span>
            </div>
          )}

          {/* High: concrete hints */}
          {level === 'high' && (
            <>
              <div className="flex items-center gap-2 text-foreground">
                <ArrowUpFromLine className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                <span>Some routes have stairs (not marked on map)</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Armchair className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                <span>Rest areas exist but aren’t shown</span>
              </div>
              {rain && (
                <div className="flex items-center gap-2 text-foreground">
                  <CloudRain className="w-3.5 h-3.5 shrink-0 text-blue-600" />
                  <span>Some paths get slippery when rainy — avoid if possible</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {level === 'low' && obstaclesAhead > 0 && (
        <p className="text-xs text-muted-foreground mt-3 italic">
          Real conditions (stairs, distance, rest spots) are not on the map.
        </p>
      )}
    </div>
  );
}
