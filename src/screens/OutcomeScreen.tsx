import { useState } from 'react';
import { Landmark, Persona, PlayerStats, HiddenCondition } from '@/types/exhibit';
import { ExhibitHeader } from '@/components/ExhibitHeader';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import { StatBar } from '@/components/StatBar';
import {
  AlertTriangle, Info, RefreshCw,
  Accessibility, Phone, Camera, MapPin, Clock, Star,
  Navigation, Globe, DollarSign, ChevronRight, ArrowLeft,
  ArrowUpFromLine, Footprints, Armchair, Sun, Bus,
  Trees, CloudRain, ShieldAlert, Bird, Mountain,
  Droplets, Store, Signpost, Bath, X, Shield,
  Ambulance, Flame, ArrowRight,
} from 'lucide-react';

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
  onBack: () => void;
}

/* ── icon helper ────────────────────────── */
const conditionIcon = (type: HiddenCondition['type'], cls = 'w-4 h-4') => {
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

/* ── Overlay panels (readable text) ─────── */
function AccessibilityPanel({ conditions, onClose }: { conditions: RevealedCondition[]; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-md bg-zinc-800 border border-zinc-600 rounded-2xl overflow-hidden max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-600 bg-zinc-800">
          <div className="flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-blue-300" />
            <h4 className="font-bold text-base text-white">Accessibility Info</h4>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-700 transition-colors">
            <X className="w-5 h-5 text-zinc-300" />
          </button>
        </div>
        <div className="overflow-y-auto p-3 space-y-2">
          {conditions.map(({ condition }) => (
            <div key={condition.id} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-700/60 border border-zinc-600">
              <div className="w-9 h-9 rounded-lg bg-red-500/20 flex items-center justify-center text-red-300 shrink-0 mt-0.5">
                {conditionIcon(condition.type, 'w-4.5 h-4.5')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{condition.label}</p>
                <p className="text-xs text-zinc-300 leading-relaxed mt-0.5">{condition.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HotlinePanel({ onClose }: { onClose: () => void }) {
  const hotlines = [
    { name: 'DOT Tourist Hotline', number: '1-386', icon: <Phone className="w-4 h-4" /> },
    { name: 'National Emergency', number: '911', icon: <Ambulance className="w-4 h-4" /> },
    { name: 'PNP Patrol 117', number: '117', icon: <Shield className="w-4 h-4" /> },
    { name: 'Red Cross', number: '143', icon: <Flame className="w-4 h-4" /> },
    { name: 'NDRRMC', number: '(02) 8911-1406', icon: <CloudRain className="w-4 h-4" /> },
  ];
  return (
    <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-sm bg-zinc-800 border border-zinc-600 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-600 bg-zinc-800">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-300" />
            <h4 className="font-bold text-base text-white">Emergency Hotlines</h4>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-700 transition-colors">
            <X className="w-5 h-5 text-zinc-300" />
          </button>
        </div>
        <div className="p-3 space-y-2">
          {hotlines.map(h => (
            <div key={h.number} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-700/60 border border-zinc-600">
              <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center text-green-300 shrink-0">
                {h.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{h.name}</p>
                <p className="text-base font-bold text-green-300">{h.number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhotosPanel({ landmark, onClose }: { landmark: Landmark; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-md bg-zinc-800 border border-zinc-600 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-600 bg-zinc-800">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-purple-300" />
            <h4 className="font-bold text-base text-white">Site Photos &amp; Conditions</h4>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-700 transition-colors">
            <X className="w-5 h-5 text-zinc-300" />
          </button>
        </div>
        <div className="p-3">
          <div className="rounded-xl overflow-hidden mb-3">
            <img
              src={landmark.imageUrl}
              alt={landmark.name}
              className="w-full h-48 object-cover"
              style={{ objectPosition: landmark.imageFocus ?? 'center' }}
            />
          </div>
          <p className="text-sm text-zinc-300 text-center leading-relaxed">
            Community-uploaded photos showing real site conditions, stairs, path surfaces, shade coverage,
            and accessibility barriers that satellite views can't capture.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Step indicator ─────────────────────── */
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current ? 'w-8 bg-primary' : i < current ? 'w-2 bg-primary/50' : 'w-2 bg-white/20'
          }`}
        />
      ))}
    </div>
  );
}

export function OutcomeScreen({
  landmark,
  persona,
  stats,
  initialStats,
  revealedConditions,
  onReset,
  onBack,
}: OutcomeScreenProps) {
  const healthLost = initialStats.health - stats.health;
  const staminaLost = initialStats.stamina - stats.stamina;
  const moneySpent = initialStats.money - stats.money;

  const [step, setStep] = useState(0); // 0 = experience, 1 = proposed map, 2 = QR
  const [overlay, setOverlay] = useState<'none' | 'accessibility' | 'hotlines' | 'photos'>('none');

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

  const stepTitles = ['Visit Complete', 'What If the Map Looked Like This?', 'Help Build Better Maps'];
  const stepSubtitles = [
    outcomeMessages[outcomeLevel].title,
    'A map with accessibility info, real conditions, emergency contacts, and community photos.',
    'Scan the QR code to contribute to a community accessibility map.',
  ];

  return (
    <div className="exhibit-container min-h-screen relative">
      {/* Back button (top-left) */}
      {step < 2 && (
        <button
          onClick={step === 0 ? onBack : () => setStep(step - 1)}
          className="fixed top-4 left-4 z-50 flex items-center justify-center w-9 h-9 rounded-lg
            bg-background/80 hover:bg-background border border-border backdrop-blur-sm
            text-foreground shadow-md transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      )}

      <ExhibitHeader
        title={stepTitles[step]}
        subtitle={stepSubtitles[step]}
      />

      {/* Step dots */}
      <div className="mb-6">
        <StepDots current={step} total={3} />
      </div>

      <div className="max-w-5xl mx-auto">

        {/* ═══════ STEP 0: Experience + Missing Info ═══════ */}
        {step === 0 && (
          <div className="space-y-4 md:space-y-6 animate-fade-in">

            {/* Side-by-side: Character + Stats (left) | Missing Info (right) */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-5 items-start">

              {/* LEFT: Character card with avatar + stats */}
              <div className="w-full lg:w-80 shrink-0 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                  <div className="flex flex-col items-center text-center mb-4">
                    <CharacterAvatar config={persona.characterConfig ?? {}} size={100} />
                    <p className="text-xs text-primary font-medium mt-3">{persona.role}</p>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {outcomeMessages[outcomeLevel].description}
                    </p>
                  </div>

                  {/* Stat chips */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-2 bg-[hsl(var(--health-bg))] rounded-lg text-center">
                      <p className="text-[10px] text-zinc-400">Health</p>
                      <p className="text-lg font-bold text-[hsl(var(--health))]">
                        {healthLost > 0 ? `-${healthLost}` : '0'}
                      </p>
                    </div>
                    <div className="p-2 bg-[hsl(var(--stamina-bg))] rounded-lg text-center">
                      <p className="text-[10px] text-zinc-400">Stamina</p>
                      <p className="text-lg font-bold text-[hsl(var(--stamina))]">
                        {staminaLost > 0 ? `-${staminaLost}` : '0'}
                      </p>
                    </div>
                    <div className="p-2 bg-[hsl(var(--money-bg))] rounded-lg text-center">
                      <p className="text-[10px] text-zinc-400">Cost</p>
                      <p className="text-lg font-bold text-[hsl(var(--money))]">
                        ₱{moneySpent > 0 ? moneySpent : 0}
                      </p>
                    </div>
                  </div>

                  {/* Bars */}
                  <div className="space-y-2">
                    <StatBar label="Health" value={stats.health} maxValue={100} type="health" />
                    <StatBar label="Stamina" value={stats.stamina} maxValue={100} type="stamina" />
                    <StatBar label="Budget" value={stats.money} maxValue={5000} type="money" />
                  </div>
                </div>
              </div>

              {/* RIGHT: Missing Info */}
              <div className="flex-1 min-w-0">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <h3 className="text-base font-bold text-foreground font-serif">Information That Was Missing</h3>
                  </div>
                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {revealedConditions.map(({ condition }) => (
                      <div
                        key={condition.id}
                        className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/15 rounded-xl"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                          {conditionIcon(condition.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground">{condition.label}</p>
                          <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">{condition.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Next button. bold CTA */}
            <button
              onClick={() => setStep(1)}
              className="w-full flex items-center justify-center gap-2 py-5 px-6 rounded-xl text-lg font-extrabold
                bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
                shadow-lg shadow-purple-500/25 transition-all duration-200 text-white
                hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
            >
              WHAT IF WE COULD FIX THIS?
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}


        {/* ═══════ STEP 1: Proposed Map ═══════ */}
        {step === 1 && (
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <div className="relative rounded-2xl border-2 border-emerald-500/30 bg-zinc-900 overflow-hidden">

              {/* Overlay panels */}
              {overlay === 'accessibility' && (
                <AccessibilityPanel conditions={revealedConditions} onClose={() => setOverlay('none')} />
              )}
              {overlay === 'hotlines' && (
                <HotlinePanel onClose={() => setOverlay('none')} />
              )}
              {overlay === 'photos' && (
                <PhotosPanel landmark={landmark} onClose={() => setOverlay('none')} />
              )}

              {/* Map view */}
              <div className="relative" style={{ height: 'clamp(320px, 55vh, 560px)' }}>
                <iframe
                  title={`Proposed map of ${landmark.name}`}
                  src={`https://maps.google.com/maps?q=${landmark.mapCenter[0]},${landmark.mapCenter[1]}&z=${landmark.mapZoom ?? 15}&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />

                {/* Right-side floating action buttons */}
                <div className="absolute right-3 top-4 z-20 flex flex-col gap-2">
                  <button
                    onClick={() => setOverlay('accessibility')}
                    className="w-11 h-11 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white hover:bg-blue-400 transition-colors"
                    title="Accessibility Info"
                  >
                    <Accessibility className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setOverlay('photos')}
                    className="w-11 h-11 rounded-xl bg-purple-500 shadow-lg shadow-purple-500/30 flex items-center justify-center text-white hover:bg-purple-400 transition-colors"
                    title="Site Photos"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setOverlay('hotlines')}
                    className="w-11 h-11 rounded-xl bg-green-500 shadow-lg shadow-green-500/30 flex items-center justify-center text-white hover:bg-green-400 transition-colors"
                    title="Emergency Hotlines"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>

                {/* Bottom condition tags */}
                <div className="absolute bottom-3 left-3 right-14 z-20 flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                  {revealedConditions.slice(0, 5).map(({ condition }) => (
                    <div
                      key={condition.id}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-800/90 backdrop-blur border border-zinc-600 text-white shrink-0"
                    >
                      <span className="text-red-400">{conditionIcon(condition.type, 'w-3.5 h-3.5')}</span>
                      <span className="text-xs font-medium whitespace-nowrap">{condition.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info panel */}
              <div className="p-4 md:p-5 space-y-3">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{landmark.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-yellow-400">4.5</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="w-3.5 h-3.5 fill-yellow-400/40 text-yellow-400/40" />
                    </div>
                    <span className="text-sm text-zinc-400">(2.1K)</span>
                  </div>
                </div>

                {/* Info rows */}
                <div className="space-y-2 border-t border-zinc-700 pt-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span className="text-sm text-white">{landmark.location}, Philippines</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-sm font-medium text-green-400">Open</span>
                    <span className="text-sm text-zinc-400">· Closes 5 PM</span>
                  </div>
                </div>

                {/* Proposed feature buttons */}
                <div className="grid grid-cols-3 gap-2 border-t border-zinc-700 pt-3">
                  <button
                    onClick={() => setOverlay('accessibility')}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 transition-colors"
                  >
                    <Accessibility className="w-5 h-5 text-blue-300" />
                    <span className="text-xs font-semibold text-white">Accessibility</span>
                  </button>
                  <button
                    onClick={() => setOverlay('photos')}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/30 transition-colors"
                  >
                    <Camera className="w-5 h-5 text-purple-300" />
                    <span className="text-xs font-semibold text-white">Site Photos</span>
                  </button>
                  <button
                    onClick={() => setOverlay('hotlines')}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-green-500/20 border border-green-400/30 hover:bg-green-500/30 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-green-300" />
                    <span className="text-xs font-semibold text-white">Hotlines</span>
                  </button>
                </div>

                {/* Standard GMaps row */}
                <div className="flex gap-2 border-t border-zinc-700 pt-3">
                  <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-zinc-800 flex-1">
                    <Navigation className="w-4 h-4 text-zinc-300" />
                    <span className="text-xs font-medium text-zinc-300">Directions</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-zinc-800 flex-1">
                    <Globe className="w-4 h-4 text-zinc-300" />
                    <span className="text-xs font-medium text-zinc-300">Website</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-zinc-800 flex-1">
                    <Star className="w-4 h-4 text-zinc-300" />
                    <span className="text-xs font-medium text-zinc-300">Save</span>
                  </div>
                </div>

                {/* Callout */}
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/25">
                  <p className="text-sm text-emerald-200 text-center font-semibold">
                    This is what we think a map should look like.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex items-center justify-center w-12 h-12 rounded-xl
                  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
                  shadow-lg shadow-purple-500/25 transition-all duration-200 text-white
                  hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-base font-bold
                  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
                  shadow-lg shadow-purple-500/25 transition-all duration-200 text-white
                  hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                Help Make This Real
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ═══════ STEP 2: QR + CTA ═══════ */}
        {step === 2 && (
          <div className="space-y-4 md:space-y-6 animate-fade-in max-w-lg mx-auto text-center">
            {/* QR frame image */}
            <div className="mx-auto">
              <img
                src="/landmarks/qr-frame.png"
                alt="QR Code - Help build better maps"
                className="w-full h-auto rounded-xl"
              />
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Scan the QR code to report incomplete landmark information or contribute
              to a community accessibility map.
            </p>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex items-center justify-center w-12 h-12 rounded-xl
                  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
                  shadow-lg shadow-purple-500/25 transition-all duration-200 text-white
                  hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onReset}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-base font-bold
                  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
                  shadow-lg shadow-purple-500/25 transition-all duration-200 text-white
                  hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                <RefreshCw className="w-5 h-5" />
                Try Another Scenario
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
