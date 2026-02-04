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

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left: Map View */}
        <div className="space-y-4 md:space-y-6">
          <div className="exhibit-card p-0 overflow-hidden">
            {/* Simplified map representation */}
            <div className="relative h-40 md:h-64 bg-gradient-to-br from-secondary via-muted to-secondary">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground text-sm md:text-base">{landmark.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{landmark.location}</p>
                </div>
              </div>
              {/* Decorative map elements */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2 py-1 md:px-3 md:py-1.5 bg-background/90 rounded-lg text-xs font-medium">
                📍 Online Map View
              </div>
            </div>
            
            {/* Basic info typically shown */}
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <h3 className="font-semibold text-foreground text-sm md:text-base">Information Available Online:</h3>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-secondary rounded-xl">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Hours</p>
                    <p className="text-xs md:text-sm font-medium truncate">8AM - 5PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-secondary rounded-xl">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-xs md:text-sm font-medium truncate">{landmark.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Warning about missing info */}
              <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-destructive/5 border border-destructive/20 rounded-xl mt-3 md:mt-4">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs md:text-sm font-medium text-destructive">Information Not Shown</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    No info on stairs, walking distances, shade, seating, or accessibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Persona & Stats */}
        <div className="space-y-4 md:space-y-6">
          {/* Current persona */}
          <div className="exhibit-card">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <span className="text-4xl md:text-5xl">{persona.avatar}</span>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground font-serif">{persona.name}</h3>
                <p className="text-primary font-medium text-sm md:text-base">{persona.role}</p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">{persona.description}</p>

            {/* Current stats */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-semibold text-foreground text-sm md:text-base">Starting Condition:</h4>
              <StatBar label="Health" value={stats.health} maxValue={100} type="health" />
              <StatBar label="Stamina" value={stats.stamina} maxValue={100} type="stamina" />
              <StatBar label="Budget" value={stats.money} maxValue={600} type="money" />
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={onStart}
            className="exhibit-button w-full text-lg md:text-xl"
          >
            Begin Visit Simulation
          </button>
          
          <p className="text-xs md:text-sm text-center text-muted-foreground">
            See what happens when you encounter the real conditions
          </p>
        </div>
      </div>
    </div>
  );
}
