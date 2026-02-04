import { HiddenCondition } from '@/types/exhibit';
import { cn } from '@/lib/utils';
import { AlertTriangle, Footprints, ArrowUpFromLine, Sun, Accessibility, Bus, Armchair } from 'lucide-react';

interface ConditionRevealProps {
  condition: HiddenCondition;
  healthImpact: number;
  staminaImpact: number;
  moneyImpact: number;
  isRevealed: boolean;
  className?: string;
}

export function ConditionReveal({ 
  condition, 
  healthImpact, 
  staminaImpact, 
  moneyImpact, 
  isRevealed,
  className 
}: ConditionRevealProps) {
  const getIcon = () => {
    switch (condition.type) {
      case 'stairs': return <ArrowUpFromLine className="w-6 h-6" />;
      case 'distance': return <Footprints className="w-6 h-6" />;
      case 'seating': return <Armchair className="w-6 h-6" />;
      case 'shade': return <Sun className="w-6 h-6" />;
      case 'accessibility': return <Accessibility className="w-6 h-6" />;
      case 'transport': return <Bus className="w-6 h-6" />;
      default: return <AlertTriangle className="w-6 h-6" />;
    }
  };

  if (!isRevealed) {
    return (
      <div className={cn(
        'p-6 rounded-2xl border-2 border-dashed border-border bg-muted/30',
        className
      )}>
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg">?</span>
          </div>
          <span className="text-lg font-medium">Information not shown on map</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'p-6 rounded-2xl bg-destructive/5 border-2 border-destructive/20 reveal-animation',
      className
    )}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-foreground mb-1">
            {condition.label}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            {condition.description}
          </p>
          
          {/* Impact indicators */}
          <div className="flex flex-wrap gap-2">
            {healthImpact !== 0 && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-[hsl(var(--health))]/10 text-[hsl(var(--health))]">
                ❤️ {healthImpact > 0 ? '+' : ''}{healthImpact}
              </span>
            )}
            {staminaImpact !== 0 && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-[hsl(var(--stamina))]/10 text-[hsl(var(--stamina))]">
                ⚡ {staminaImpact > 0 ? '+' : ''}{staminaImpact}
              </span>
            )}
            {moneyImpact !== 0 && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-[hsl(var(--money))]/10 text-[hsl(var(--money))]">
                💰 {moneyImpact > 0 ? '+' : ''}₱{Math.abs(moneyImpact)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
