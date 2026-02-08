import { useState, useEffect } from 'react';
import { Landmark, Persona, PlayerStats, HiddenCondition } from '@/types/exhibit';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import { StatBar } from '@/components/StatBar';
import { ChevronRight, Check, Footprints, ArrowUpFromLine, Sun, Accessibility, Bus, Armchair, AlertTriangle, MapPin, Trees, CloudRain, DollarSign, ShieldAlert, Bird, Mountain, Droplets, Store, Signpost, Bath, ArrowLeft } from 'lucide-react';

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
  onBack: () => void;
}

const conditionIcon = (type: HiddenCondition['type']) => {
  const cls = 'w-7 h-7';
  switch (type) {
    case 'stairs': return <ArrowUpFromLine className={cls} />;
    case 'distance': return <Footprints className={cls} />;
    case 'seating': return <Armchair className={cls} />;
    case 'shade': return <Sun className={cls} />;
    case 'accessibility': return <Accessibility className={cls} />;
    case 'transport': return <Bus className={cls} />;
    case 'crowd': return <MapPin className={cls} />;
    case 'terrain': return <Trees className={cls} />;
    case 'weather': return <CloudRain className={cls} />;
    case 'cost': return <DollarSign className={cls} />;
    case 'safety': return <ShieldAlert className={cls} />;
    case 'wildlife': return <Bird className={cls} />;
    case 'altitude': return <Mountain className={cls} />;
    case 'water': return <Droplets className={cls} />;
    case 'vendors': return <Store className={cls} />;
    case 'signage': return <Signpost className={cls} />;
    case 'restroom': return <Bath className={cls} />;
    default: return <AlertTriangle className={cls} />;
  }
};

/* Walking‑dot animation */
function WalkingDots() {
  return (
    <span className="inline-flex gap-0.5 ml-1">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-white/70 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.6s' }}
        />
      ))}
    </span>
  );
}

export function RevealScreen({
  landmark,
  persona,
  stats,
  revealedConditions,
  currentRevealIndex,
  onRevealNext,
  onFinish,
  onBack,
}: RevealScreenProps) {
  const totalConditions = landmark.hiddenConditions.length;
  const allRevealed = currentRevealIndex >= totalConditions;
  const latestReveal = revealedConditions[revealedConditions.length - 1];

  /* Animate new condition card in */
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    setAnimKey(k => k + 1);
  }, [currentRevealIndex]);

  /* Flash stat bars on impact */
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (latestReveal) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(t);
    }
  }, [latestReveal]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Back button (top-left) */}
      <button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 flex items-center justify-center w-9 h-9 rounded-lg
          bg-background/80 hover:bg-background border border-border backdrop-blur-sm
          text-foreground shadow-md transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {/* Background scene tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-950 -z-10" />
      <div className="game-grid-overlay" />

      {/* Top: progress bar + landmark name */}
      <div className="w-full px-4 pt-4 pb-2 shrink-0 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg md:text-xl font-bold font-serif text-foreground">
              Exploring {landmark.name}
            </h1>
            <span className="text-xs text-muted-foreground">
              {currentRevealIndex} / {totalConditions}
            </span>
          </div>
          {/* Step progress */}
          <div className="flex gap-1">
            {landmark.hiddenConditions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i < currentRevealIndex
                    ? 'bg-primary'
                    : i === currentRevealIndex && !allRevealed
                    ? 'bg-primary/40 animate-pulse'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-stretch max-w-5xl mx-auto w-full px-4 py-4 gap-5 min-h-0">

        {/* LEFT: Character + stats */}
        <div className="w-52 md:w-60 shrink-0 flex flex-col gap-4">
          {/* Character card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex flex-col items-center text-center">
            <div className={`transition-transform duration-300 ${flash ? 'scale-95' : 'scale-100'}`}>
              <CharacterAvatar config={persona.characterConfig ?? {}} size={80} />
            </div>
            <h3 className="text-sm font-bold text-foreground font-serif mt-2">{persona.name}</h3>
            <p className="text-[11px] text-purple-400 font-medium">{persona.role}</p>
          </div>

          {/* Stats */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 space-y-3 flex-1">
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
              maxValue={5000}
              type="money"
              showChange={latestReveal?.moneyImpact}
            />

            {/* Vulnerabilities */}
            {persona.vulnerabilities.length > 0 && (
              <div className="pt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-1 justify-center">
                  {persona.vulnerabilities.map(v => (
                    <span key={v} className="px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400 text-[9px] font-medium border border-red-500/20">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Single condition card (replaces on each step) */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          <div className="flex-1 flex items-center justify-center">
            {currentRevealIndex === 0 && !latestReveal ? (
              /* Initial state. haven't started walking yet */
              <div className="text-center space-y-4 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Footprints className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif text-foreground">
                    Ready to explore?
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                    As {persona.name} walks through {landmark.name}, hidden conditions will appear that weren't shown on the map.
                  </p>
                </div>
              </div>
            ) : latestReveal ? (
              /* Current revealed condition. replaces previous one */
              <div
                key={animKey}
                className="w-full max-w-xl animate-slide-in-right"
              >
                <div className="rounded-2xl bg-destructive/5 border-2 border-destructive/20 p-6 md:p-8 space-y-5">
                  {/* Icon + title */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive shrink-0">
                      {conditionIcon(latestReveal.condition.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wider text-destructive/70 font-semibold mb-1">
                        Hidden condition #{currentRevealIndex}
                      </p>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground font-serif leading-tight">
                        {latestReveal.condition.label}
                      </h2>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {latestReveal.condition.description}
                  </p>

                  {/* Impact badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {latestReveal.healthImpact !== 0 && (
                      <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-[hsl(var(--health))]/10 text-[hsl(var(--health))] animate-fade-in">
                        ❤️ {latestReveal.healthImpact > 0 ? '+' : ''}{latestReveal.healthImpact}
                      </span>
                    )}
                    {latestReveal.staminaImpact !== 0 && (
                      <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-[hsl(var(--stamina))]/10 text-[hsl(var(--stamina))] animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        ⚡ {latestReveal.staminaImpact > 0 ? '+' : ''}{latestReveal.staminaImpact}
                      </span>
                    )}
                    {latestReveal.moneyImpact !== 0 && (
                      <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-[hsl(var(--money))]/10 text-[hsl(var(--money))] animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        💰 {latestReveal.moneyImpact > 0 ? '+' : ''}₱{Math.abs(latestReveal.moneyImpact)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Narrative text */}
                <p className="text-xs text-muted-foreground/60 text-center mt-3 italic">
                  This information was not available on Google Maps.
                </p>
              </div>
            ) : null}
          </div>

          {/* Bottom action button */}
          <div className="pt-4 shrink-0">
            {!allRevealed ? (
              <button
                onClick={onRevealNext}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-base font-bold
                  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
                  shadow-lg shadow-purple-500/25 transition-all duration-200 text-white
                  hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Footprints className="w-5 h-5" />
                {currentRevealIndex === 0 ? 'Start Walking' : 'Continue Walking'}
                <WalkingDots />
              </button>
            ) : (
              <button
                onClick={onFinish}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-base font-bold
                  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
                  shadow-lg shadow-purple-500/25 transition-all duration-200 text-white
                  hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Check className="w-5 h-5" />
                View Final Results
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
