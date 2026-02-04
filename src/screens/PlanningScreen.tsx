import { Landmark, Persona, PlayerStats } from '@/types/exhibit';
import { ExhibitHeader } from '@/components/ExhibitHeader';
import { StatBar } from '@/components/StatBar';
import { MapPin, Clock, AlertTriangle } from 'lucide-react';

interface PlanningScreenProps {
  landmark: Landmark;
  persona: Persona;
  stats: PlayerStats;
  onStart: () => void;
  onBack: () => void;
}

export function PlanningScreen({ landmark, persona, stats, onStart, onBack }: PlanningScreenProps) {
  return (
    <div className="exhibit-container min-h-screen">
      <ExhibitHeader
        title="Plan Your Visit"
        subtitle="Here's what most online maps show you. Can you safely plan this visit based on this information?"
        showBack
        onBack={onBack}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Map View */}
        <div className="space-y-6">
          <div className="exhibit-card p-0 overflow-hidden">
            {/* Simplified map representation */}
            <div className="relative h-64 bg-gradient-to-br from-secondary via-muted to-secondary">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">{landmark.name}</p>
                  <p className="text-sm text-muted-foreground">{landmark.location}</p>
                </div>
              </div>
              {/* Decorative map elements */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/90 rounded-lg text-xs font-medium">
                📍 Online Map View
              </div>
            </div>
            
            {/* Basic info typically shown */}
            <div className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Information Available Online:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Hours</p>
                    <p className="text-sm font-medium">8:00 AM - 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{landmark.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Warning about missing info */}
              <div className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/20 rounded-xl mt-4">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive">Information Not Shown</p>
                  <p className="text-sm text-muted-foreground">
                    This map doesn't indicate stairs, walking distances, shade availability, 
                    seating areas, or accessibility features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Persona & Stats */}
        <div className="space-y-6">
          {/* Current persona */}
          <div className="exhibit-card">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{persona.avatar}</span>
              <div>
                <h3 className="text-xl font-bold text-foreground font-serif">{persona.name}</h3>
                <p className="text-primary font-medium">{persona.role}</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">{persona.description}</p>

            {/* Current stats */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Starting Condition:</h4>
              <StatBar label="Health" value={stats.health} maxValue={100} type="health" />
              <StatBar label="Stamina" value={stats.stamina} maxValue={100} type="stamina" />
              <StatBar label="Budget" value={stats.money} maxValue={600} type="money" />
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={onStart}
            className="exhibit-button w-full text-xl"
          >
            Begin Visit Simulation
          </button>
          
          <p className="text-sm text-center text-muted-foreground">
            See what happens when you encounter the real conditions
          </p>
        </div>
      </div>
    </div>
  );
}
