import { Landmark, Persona, PlayerStats, HiddenCondition } from '@/types/exhibit';
import { ExhibitHeader } from '@/components/ExhibitHeader';
import { StatBar } from '@/components/StatBar';
import { AlertTriangle, Info, RefreshCw, QrCode, ExternalLink } from 'lucide-react';

interface RevealedCondition {
  condition: HiddenCondition;
  healthImpact: number;
  staminaImpact: number;
  moneyImpact: number;
}

interface OutcomeScreenProps {
  landmark: Landmark;
  persona: Persona;
  stats: PlayerStats;
  initialStats: PlayerStats;
  revealedConditions: RevealedCondition[];
  onReset: () => void;
}

export function OutcomeScreen({
  landmark,
  persona,
  stats,
  initialStats,
  revealedConditions,
  onReset,
}: OutcomeScreenProps) {
  const healthLost = initialStats.health - stats.health;
  const staminaLost = initialStats.stamina - stats.stamina;
  const moneySpent = initialStats.money - stats.money;

  const getOutcomeLevel = () => {
    const totalImpact = healthLost + staminaLost;
    if (totalImpact > 60) return 'severe';
    if (totalImpact > 30) return 'moderate';
    return 'mild';
  };

  const outcomeLevel = getOutcomeLevel();

  const outcomeMessages = {
    severe: {
      title: "This visit was unexpectedly challenging",
      description: `Without prior knowledge of the conditions at ${landmark.name}, ${persona.name} experienced significant difficulties that could have been avoided with better information.`
    },
    moderate: {
      title: "This visit had some difficulties",
      description: `${persona.name} encountered several unexpected challenges at ${landmark.name} that weren't indicated in the online map.`
    },
    mild: {
      title: "This visit had minor surprises",
      description: `While ${persona.name} managed the visit reasonably well, some conditions at ${landmark.name} still weren't properly communicated beforehand.`
    }
  };

  return (
    <div className="exhibit-container min-h-screen">
      <ExhibitHeader
        title="Visit Complete"
        subtitle={outcomeMessages[outcomeLevel].title}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Outcome summary */}
        <div className="exhibit-card p-8">
          <div className="flex items-start gap-6 mb-8">
            <span className="text-6xl">{persona.avatar}</span>
            <div>
              <h3 className="text-2xl font-bold text-foreground font-serif mb-2">
                {persona.name}'s Experience
              </h3>
              <p className="text-lg text-muted-foreground">
                {outcomeMessages[outcomeLevel].description}
              </p>
            </div>
          </div>

          {/* Final stats comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-[hsl(var(--health-bg))] rounded-2xl text-center">
              <p className="text-sm text-muted-foreground mb-2">Health Impact</p>
              <p className="text-3xl font-bold text-[hsl(var(--health))]">
                {healthLost > 0 ? `-${healthLost}` : '0'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {initialStats.health}% → {stats.health}%
              </p>
            </div>
            <div className="p-6 bg-[hsl(var(--stamina-bg))] rounded-2xl text-center">
              <p className="text-sm text-muted-foreground mb-2">Stamina Depleted</p>
              <p className="text-3xl font-bold text-[hsl(var(--stamina))]">
                {staminaLost > 0 ? `-${staminaLost}` : '0'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {initialStats.stamina}% → {stats.stamina}%
              </p>
            </div>
            <div className="p-6 bg-[hsl(var(--money-bg))] rounded-2xl text-center">
              <p className="text-sm text-muted-foreground mb-2">Unexpected Costs</p>
              <p className="text-3xl font-bold text-[hsl(var(--money))]">
                {moneySpent > 0 ? `₱${moneySpent}` : '₱0'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                ₱{initialStats.money} → ₱{stats.money}
              </p>
            </div>
          </div>

          {/* Final bars */}
          <div className="space-y-4">
            <StatBar label="Final Health" value={stats.health} maxValue={100} type="health" />
            <StatBar label="Final Stamina" value={stats.stamina} maxValue={100} type="stamina" />
            <StatBar label="Remaining Budget" value={stats.money} maxValue={600} type="money" />
          </div>
        </div>

        {/* What was missing */}
        <div className="exhibit-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-destructive" />
            <h3 className="text-xl font-bold text-foreground font-serif">
              Information That Was Missing
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {revealedConditions.map(({ condition }) => (
              <div 
                key={condition.id}
                className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl"
              >
                <h4 className="font-semibold text-foreground mb-1">{condition.label}</h4>
                <p className="text-sm text-muted-foreground">{condition.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key insight */}
        <div className="p-6 bg-accent/10 border-2 border-accent/30 rounded-2xl">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-accent shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-foreground mb-2">The Real Issue</h4>
              <p className="text-muted-foreground leading-relaxed">
                This experience wasn't about {persona.name} making poor choices—it was about 
                <strong className="text-foreground"> missing information</strong>. 
                When online maps only show location and hours, visitors cannot adequately prepare 
                for stairs, distances, limited seating, or accessibility barriers. This affects 
                everyone, but especially those with mobility limitations, families with young children, 
                and elderly visitors.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="exhibit-card p-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <QrCode className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground font-serif mb-4">
            Help Build Better Maps
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Scan the QR code to report incomplete landmark information, share accessibility notes, 
            or contribute photos to a community digital accessibility map.
          </p>
          
          {/* QR placeholder */}
          <div className="w-48 h-48 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-border">
            <div className="text-center">
              <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">QR Code Placeholder</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8">
            <strong>For tourism managers and authorities:</strong> We encourage the publication 
            of standardized accessibility and safety data for all public landmarks.
          </p>

          {/* Restart button */}
          <button
            onClick={onReset}
            className="exhibit-button exhibit-button-secondary flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Try Another Scenario
          </button>
        </div>
      </div>
    </div>
  );
}
