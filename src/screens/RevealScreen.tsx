import { Landmark, Persona, PlayerStats, HiddenCondition } from '@/types/exhibit';
import { ExhibitHeader } from '@/components/ExhibitHeader';
import { StatBar } from '@/components/StatBar';
import { ConditionReveal } from '@/components/ConditionReveal';
import { ChevronRight, Check } from 'lucide-react';

interface RevealedCondition {
  condition: HiddenCondition;
  healthImpact: number;
  staminaImpact: number;
  moneyImpact: number;
}

interface RevealScreenProps {
  landmark: Landmark;
  persona: Persona;
  stats: PlayerStats;
  revealedConditions: RevealedCondition[];
  currentRevealIndex: number;
  onRevealNext: () => void;
  onFinish: () => void;
}

export function RevealScreen({
  landmark,
  persona,
  stats,
  revealedConditions,
  currentRevealIndex,
  onRevealNext,
  onFinish,
}: RevealScreenProps) {
  const totalConditions = landmark.hiddenConditions.length;
  const allRevealed = currentRevealIndex >= totalConditions;
  const latestReveal = revealedConditions[revealedConditions.length - 1];

  return (
    <div className="exhibit-container min-h-screen">
      <ExhibitHeader
        title="Your Visit Begins..."
        subtitle={`As ${persona.name} explores ${landmark.name}, hidden realities emerge that weren't on the map.`}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Conditions */}
        <div className="lg:col-span-2 space-y-4">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-6">
            {landmark.hiddenConditions.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  index < currentRevealIndex
                    ? 'bg-primary'
                    : 'bg-border'
                }`}
              />
            ))}
          </div>

          {/* Revealed conditions */}
          <div className="space-y-4">
            {landmark.hiddenConditions.map((condition, index) => {
              const revealed = revealedConditions.find(r => r.condition.id === condition.id);
              return (
                <ConditionReveal
                  key={condition.id}
                  condition={condition}
                  healthImpact={revealed?.healthImpact || 0}
                  staminaImpact={revealed?.staminaImpact || 0}
                  moneyImpact={revealed?.moneyImpact || 0}
                  isRevealed={index < currentRevealIndex}
                />
              );
            })}
          </div>

          {/* Action button */}
          <div className="pt-6">
            {!allRevealed ? (
              <button
                onClick={onRevealNext}
                className="exhibit-button flex items-center justify-center gap-2 w-full md:w-auto"
              >
                Continue Walking
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={onFinish}
                className="exhibit-button exhibit-button-accent flex items-center justify-center gap-2 w-full md:w-auto"
              >
                View Final Results
                <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Stats sidebar */}
        <div className="space-y-6">
          {/* Persona reminder */}
          <div className="exhibit-card">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{persona.avatar}</span>
              <div>
                <h4 className="font-semibold text-foreground">{persona.name}</h4>
                <p className="text-sm text-muted-foreground">{persona.role}</p>
              </div>
            </div>

            {/* Live stats */}
            <div className="space-y-4">
              <StatBar 
                label="Health" 
                value={stats.health} 
                maxValue={100} 
                type="health"
                showChange={latestReveal?.healthImpact}
              />
              <StatBar 
                label="Stamina" 
                value={stats.stamina} 
                maxValue={100} 
                type="stamina"
                showChange={latestReveal?.staminaImpact}
              />
              <StatBar 
                label="Budget" 
                value={stats.money} 
                maxValue={600} 
                type="money"
                showChange={latestReveal?.moneyImpact}
              />
            </div>
          </div>

          {/* Current status */}
          <div className="p-4 bg-muted rounded-xl">
            <p className="text-sm text-muted-foreground text-center">
              {currentRevealIndex === 0 && "Starting your visit..."}
              {currentRevealIndex > 0 && currentRevealIndex < totalConditions && 
                `Encountered ${currentRevealIndex} of ${totalConditions} hidden conditions`}
              {allRevealed && "Visit complete. View your results."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
