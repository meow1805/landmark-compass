import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapView } from '@/components/MapTransparency/MapView';
import { PersonaCard } from '@/components/PersonaCard';
import { SketchMapGame } from '@/components/SketchMapGame';
import { SolutionMap } from '@/components/SolutionMap';
import { landmarks } from '@/data/landmarks';
import { personas } from '@/data/personas';
import type { HiddenCondition, Landmark, Persona } from '@/types/exhibit';

type Step = 'landmark' | 'persona' | 'traditional' | 'navigate' | 'reveal';
type StatKey = 'health' | 'stamina' | 'money';

type NavDirection = 'left' | 'right' | 'straight';

type MapNode = {
  id: number;
  left?: number;
  right?: number;
  straight?: number;
  position: { left: string; top: string };
  pan: { x: number; y: number };
};

type Obstacle = HiddenCondition;

const clamp = (value: number) => Math.max(0, Math.min(100, value));

const ProgressBar = ({ label, value, variant }: { label: string; value: number; variant: 'health' | 'stamina' | 'money' }) => (
  <div>
    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className={`stat-bar stat-bar-${variant}`}>
      <div className="stat-bar-fill" style={{ width: `${value}%` }} />
    </div>
  </div>
);

const ExhibitPage = () => {
  const [step, setStep] = useState<Step>('landmark');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [planningAnswer, setPlanningAnswer] = useState<'safe' | 'unsure' | 'not-ready' | null>(null);
  const [stats, setStats] = useState<Record<StatKey, number>>({
    health: 0,
    stamina: 0,
    money: 0,
  });
  const [revealed, setRevealed] = useState<Obstacle[]>([]);
  const [lastDirection, setLastDirection] = useState<NavDirection | null>(null);
  const [currentNode, setCurrentNode] = useState(0);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const obstacles = useMemo(() => selectedLandmark?.hiddenConditions ?? [], [selectedLandmark]);
  const availableObstacles = useMemo(
    () => obstacles.filter((o) => !revealed.some((r) => r.id === o.id)),
    [obstacles, revealed]
  );
  const canNavigate = availableObstacles.length > 0;
  /** Which obstacle gets revealed depends on the direction the player chooses. */
  const getObstacleForDirection = (dir: NavDirection) => {
    const idx = { left: 0, straight: 1, right: 2 }[dir];
    return availableObstacles[idx % availableObstacles.length] ?? null;
  };
  const mapNodes: MapNode[] = [
    {
      id: 0,
      left: 1,
      straight: 2,
      right: 3,
      position: { left: '18%', top: '62%' },
      pan: { x: 0, y: 0 },
    },
    {
      id: 1,
      left: 4,
      straight: 2,
      right: 0,
      position: { left: '30%', top: '52%' },
      pan: { x: -10, y: -6 },
    },
    {
      id: 2,
      left: 1,
      straight: 5,
      right: 3,
      position: { left: '46%', top: '44%' },
      pan: { x: -22, y: -12 },
    },
    {
      id: 3,
      left: 2,
      straight: 5,
      right: 6,
      position: { left: '62%', top: '34%' },
      pan: { x: -18, y: -18 },
    },
    {
      id: 4,
      left: 1,
      straight: 2,
      right: 7,
      position: { left: '24%', top: '38%' },
      pan: { x: -6, y: -20 },
    },
    {
      id: 5,
      left: 2,
      straight: 8,
      right: 3,
      position: { left: '70%', top: '48%' },
      pan: { x: -6, y: -30 },
    },
    {
      id: 6,
      left: 3,
      straight: 8,
      right: 6,
      position: { left: '82%', top: '30%' },
      pan: { x: 0, y: -36 },
    },
    {
      id: 7,
      left: 4,
      straight: 5,
      right: 7,
      position: { left: '38%', top: '28%' },
      pan: { x: -16, y: -32 },
    },
    {
      id: 8,
      left: 5,
      straight: 8,
      right: 6,
      position: { left: '76%', top: '22%' },
      pan: { x: 0, y: -42 },
    },
  ];

  const startPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    setStats({
      health: persona.initialHealth,
      stamina: persona.initialStamina,
      money: persona.initialMoney,
    });
    setPlanningAnswer(null);
    setStep('traditional');
  };

  const applyImpact = (
    label: string,
    impacts: Record<StatKey, number>,
    personaMultiplier: Partial<Record<StatKey, number>> = {}
  ) => {
    if (!selectedPersona) return;

    const applied: Record<StatKey, number> = { health: 0, stamina: 0, money: 0 };
    setStats((prev) => {
      const updated: Record<StatKey, number> = { ...prev };

      (Object.keys(impacts) as StatKey[]).forEach((key) => {
        const baseDelta = impacts[key];
        const personaFactor = personaMultiplier[key] ?? 1;
        const adjustedDelta = baseDelta * personaFactor;
        const nextValue = clamp(prev[key] + adjustedDelta);
        applied[key] = Math.round(nextValue - prev[key]);
        updated[key] = nextValue;
      });

      return updated;
    });

    const parts = (['health', 'stamina', 'money'] as StatKey[])
      .filter((key) => applied[key] !== 0)
      .map((key) => `${key} ${applied[key] > 0 ? '+' : ''}${applied[key]}`);

    if (parts.length > 0) {
      setEventLog((prev) => [`${label}: ${parts.join(', ')}`, ...prev].slice(0, 6));
    }
  };

  const handleNavigate = (direction: NavDirection) => {
    const obstacle = getObstacleForDirection(direction);
    if (!obstacle) return;

    const personaBoost = obstacle.personaMultipliers?.[selectedPersona?.id ?? ''] ?? {};
    applyImpact(obstacle.label, {
      health: obstacle.healthImpact,
      stamina: obstacle.staminaImpact,
      money: obstacle.moneyImpact,
    }, personaBoost);

    setRevealed((prev) => [...prev, obstacle]);
    setLastDirection(direction);
    const node = mapNodes[currentNode];
    const nextNode = node?.[direction];
    if (typeof nextNode === 'number') {
      setCurrentNode(nextNode);
    }
  };

  const handlePlanningAnswer = (answer: 'safe' | 'unsure' | 'not-ready') => {
    setPlanningAnswer(answer);
    setStep('navigate');
  };

  const header = (
    <div className="mb-8">
      <div className="step-chip">Interactive Game — Landmark (Leo Donn Araneta)</div>
      <h1 className="exhibit-title mt-4">Who Is This Map For? The Cost of Incomplete Information in City Landmarks</h1>
      <p className="mt-3 text-muted-foreground max-w-3xl">
        City landmarks often rely on digital maps that show only location, hours, and ticket prices. They often do not show long corridors, stair-only access, uneven paths, limited rest areas, or safety concerns. This game shows how missing information affects planning, safety, and experience—and how complete maps help everyone visit safely.
      </p>
      <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
        <strong>How to play:</strong> Select a landmark, then a persona (student, professor, first-time visitor). See the incomplete map, then navigate the landmark—at each fork choose left, straight, or right. Encounter unmarked stairs, long corridors, and missing rest areas. After the route, see the full updated map with all critical details.
      </p>
    </div>
  );

  return (
    <div className="exhibit-container">
      <div className="mx-auto max-w-6xl">
        {header}

        {step === 'landmark' && (
          <div className="reveal-animation">
            <p className="text-sm text-muted-foreground mb-4">Select a city landmark. You&apos;ll see the kind of incomplete map visitors usually get (location, hours, ticket price), then navigate and discover what&apos;s missing.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {landmarks.map((landmark) => (
                <div
                  key={landmark.id}
                  className="exhibit-card cursor-pointer overflow-hidden p-0"
                  onClick={() => {
                    setSelectedLandmark(landmark);
                    setRevealed([]);
                    setCurrentNode(0);
                    setLastDirection(null);
                    setEventLog([]);
                    setStep('persona');
                  }}
                >
                  <div className="landmark-image-wrapper">
                    <img
                      src={landmark.imageUrl}
                      alt={landmark.name}
                      className="landmark-image"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.onerror = null;
                        t.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect fill="%23e8e4e0" width="400" height="240"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b6560" font-family="sans-serif" font-size="18">${landmark.name}</text></svg>`);
                      }}
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="text-lg font-semibold">{landmark.name}</div>
                    <div className="text-sm text-muted-foreground">{landmark.location}</div>
                    <div className="text-xs text-muted-foreground mt-2">What maps usually show: Location • Hours • Ticket price</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'persona' && selectedLandmark && (
          <div className="reveal-animation">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Select a persona (e.g. student, professor, first-time visitor). Your character&apos;s vulnerabilities affect how obstacles impact your stats.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personas.map((persona) => (
                <PersonaCard key={persona.id} persona={persona} onClick={() => startPersona(persona)} />
              ))}
            </div>
          </div>
        )}

        {step === 'traditional' && selectedLandmark && selectedPersona && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start reveal-animation">
            <div className="lg:col-span-2 space-y-5">
              <div className="exhibit-card">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <div className="text-lg font-semibold">What Google Maps / listings usually show</div>
                    <div className="text-xs text-muted-foreground">Location • Hours • Ticket price — no stairs, rest areas, or hazards</div>
                  </div>
                  <div className="step-chip">GMaps-style</div>
                </div>
                <MapView
                  height={320}
                  center={selectedLandmark.mapCenter ?? [14.5895, 120.9739]}
                  zoom={selectedLandmark.mapZoom ?? 16}
                  popupTitle={selectedLandmark.name}
                  popupSubtitle={selectedLandmark.location}
                />
              </div>

              <div className="exhibit-card">
                <div className="text-lg font-semibold">Can you safely plan this visit based on this information?</div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button className="exhibit-button" onClick={() => handlePlanningAnswer('safe')}>I can plan safely</Button>
                  <Button className="exhibit-button exhibit-button-secondary" onClick={() => handlePlanningAnswer('unsure')}>Not sure</Button>
                  <Button className="exhibit-button" onClick={() => handlePlanningAnswer('not-ready')}>I would not be prepared</Button>
                </div>
              </div>
            </div>

            <div className="space-y-5 slide-in-right">
              <div className="character-card">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="character-portrait">{selectedPersona.avatar}</div>
                    <div>
                      <div className="text-lg font-bold">{selectedPersona.name}</div>
                      <div className="text-xs font-semibold text-primary">{selectedPersona.role}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <ProgressBar label="Health" value={stats.health} variant="health" />
                  <ProgressBar label="Stamina" value={stats.stamina} variant="stamina" />
                  <ProgressBar label="Money" value={stats.money} variant="money" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'navigate' && selectedLandmark && selectedPersona && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start reveal-animation">
            <div className="lg:col-span-2 space-y-5">
              <div className="exhibit-card">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-lg font-semibold">Navigate the landmark</div>
                    <div className="text-xs text-muted-foreground">You’re at a fork in the road. Choose a path — your character will move, and you’ll discover what the map didn’t show.</div>
                  </div>
                  <div className="step-chip">Game</div>
                </div>
                <SketchMapGame
                  characterAvatar={selectedPersona.avatar}
                  currentDirection={lastDirection}
                  onChooseDirection={handleNavigate}
                  canNavigate={canNavigate}
                />
                <p className="mt-3 text-xs text-muted-foreground">Each path can reveal different hidden conditions. What you find depends on your choice and your character’s passive effects.</p>
              </div>

              <div className="exhibit-card">
                <div className="text-sm font-semibold text-muted-foreground mb-2">What the map didn’t show (revealed as you walk)</div>
                <div className="space-y-2">
                  {revealed.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Choose a path above to reveal hidden conditions.</p>
                  ) : (
                    revealed.map((item) => (
                      <div key={item.id} className="text-sm">
                        • {item.label}: {item.description}
                      </div>
                    ))
                  )}
                </div>

                {revealed.length >= obstacles.length && (
                  <div className="mt-5">
                    <Button className="exhibit-button" onClick={() => setStep('reveal')}>Show the full updated map</Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-5 slide-in-right">
              <div className="character-card">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="character-portrait">{selectedPersona.avatar}</div>
                    <div>
                      <div className="text-lg font-bold">{selectedPersona.name}</div>
                      <div className="text-xs font-semibold text-primary">{selectedPersona.role}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <ProgressBar label="Health" value={stats.health} variant="health" />
                  <ProgressBar label="Stamina" value={stats.stamina} variant="stamina" />
                  <ProgressBar label="Money" value={stats.money} variant="money" />
                </div>
              </div>
              <div className="exhibit-card">
                <div className="text-lg font-semibold">Why stats changed</div>
                <div className="text-xs text-muted-foreground">Recent impacts from hidden conditions</div>
                <div className="mt-3 space-y-2 text-sm">
                  {eventLog.length === 0 ? (
                    <div className="text-muted-foreground">No changes yet. Make a move to reveal conditions.</div>
                  ) : (
                    eventLog.map((item, index) => (
                      <div key={`${item}-${index}`}>• {item}</div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'reveal' && selectedLandmark && (
          <div className="space-y-6 reveal-animation">
            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4">
              <h3 className="text-lg font-semibold text-foreground mb-1">Our solution: complete maps</h3>
              <p className="text-sm text-muted-foreground">
                Maps should show hazards, rest areas, and safety info so everyone can plan safely. Below: what traditional maps show vs. what a complete map includes (paths, stairs, rest areas, safety info).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="exhibit-card">
                <div className="text-lg font-semibold">What maps traditionally show (GMaps-style)</div>
                <div className="rounded-xl overflow-hidden border border-border mt-3">
                  <MapView
                    height={220}
                    center={selectedLandmark.mapCenter ?? [14.5895, 120.9739]}
                    zoom={selectedLandmark.mapZoom ?? 16}
                    popupTitle={selectedLandmark.name}
                    popupSubtitle={selectedLandmark.location}
                  />
                </div>
                <div className="mt-3 text-sm text-muted-foreground">Location • Hours • Ticket price</div>
                <p className="text-xs text-muted-foreground mt-2">No stairs, no rest areas, no hazards — visitors are left to guess.</p>
              </div>
              <div className="exhibit-card">
                <SolutionMap landmarkName={selectedLandmark.name} conditions={obstacles} />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Complete maps help everyone plan better and visit safely. Encourage students, professors, and authorities to report missing information and adopt standardized, verified digital listings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitPage;
