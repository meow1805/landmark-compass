import { useState, useEffect, useCallback, useMemo } from 'react';
import { Landmark, Region } from '@/types/exhibit';
import { LandmarkCard } from '@/components/LandmarkCard';
import { PhilippinesMap } from '@/components/PhilippinesMap';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

/* ── Floating particles for game-like background ── */
const PARTICLE_COLORS = [
  'hsl(260 60% 60%)',    // purple (luzon)
  'hsl(160 70% 45%)',    // emerald (visayas)
  'hsl(15 80% 55%)',     // coral (mindanao)
  'hsl(40 90% 60%)',     // gold accent
  'hsl(190 70% 50%)',    // cyan spark
  'hsl(320 60% 55%)',    // magenta
];

function GameParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 3 + Math.random() * 5,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 10,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    })),
  []);

  return (
    <div className="game-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

interface LandmarkScreenProps {
  landmarks: Landmark[];
  onSelect: (landmark: Landmark) => void;
  onBack: () => void;
}

const regionLabels: Record<Region, { name: string; color: string; emoji: string }> = {
  luzon: { name: 'Luzon', color: 'from-[#6c5ce7] to-[#5b4cdb]', emoji: '🏔️' },
  visayas: { name: 'Visayas', color: 'from-[#00b894] to-[#00a381]', emoji: '🏝️' },
  mindanao: { name: 'Mindanao', color: 'from-[#e17055] to-[#d35843]', emoji: '🌴' },
};

export function LandmarkScreen({ landmarks, onSelect, onBack }: LandmarkScreenProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);
  const [showCards, setShowCards] = useState(false);
  const [cardsReady, setCardsReady] = useState(false);

  const isRegionSelected = selectedRegion !== null;

  const filtered = selectedRegion
    ? landmarks.filter((l) => l.region === selectedRegion)
    : [];

  const activeLandmark = selectedLandmark
    ? landmarks.find((l) => l.id === selectedLandmark) ?? null
    : null;

  // Handle region selection → animate map to side, then reveal cards
  const handleSelectRegion = useCallback((region: Region) => {
    if (selectedRegion) return;
    setSelectedRegion(region);
    // Wait for map slide animation, then show cards
    setTimeout(() => setShowCards(true), 450);
    // Extra buffer before cards become interactive
    setTimeout(() => setCardsReady(true), 2000);
  }, [selectedRegion]);

  // Back logic
  const handleBack = useCallback(() => {
    if (selectedLandmark) {
      setSelectedLandmark(null);
    } else if (selectedRegion) {
      setShowCards(false);
      setCardsReady(false);
      // Wait for cards to slide out, then reset map
      setTimeout(() => {
        setSelectedRegion(null);
        setSelectedLandmark(null);
        setHoveredLandmark(null);
      }, 350);
    } else {
      onBack();
    }
  }, [selectedRegion, selectedLandmark, onBack]);

  // Click landmark dot or card
  const handleLandmarkSelect = useCallback((id: string) => {
    setSelectedLandmark((prev) => (prev === id ? null : id));
  }, []);

  // Confirm and proceed
  const handleConfirm = useCallback(() => {
    if (activeLandmark) onSelect(activeLandmark);
  }, [activeLandmark, onSelect]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <div className="game-grid-overlay" />
      <GameParticles />

      {/* Top bar — always visible */}
      <div className="w-full pt-4 pb-2 px-4 relative shrink-0 z-10">
        <button
          onClick={isRegionSelected ? handleBack : onBack}
          className="absolute top-3 left-4 p-2 rounded-full hover:bg-muted/60 transition-colors z-10"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold font-serif transition-all duration-500">
            {isRegionSelected
              ? `${regionLabels[selectedRegion!].emoji} ${regionLabels[selectedRegion!].name}`
              : 'Choose Your Destination 📍'}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-md mx-auto transition-opacity duration-300">
            {isRegionSelected
              ? (selectedLandmark ? '' : 'Select a landmark on the map or from the cards')
              : 'Tap a region on the map to explore its landmarks'}
          </p>
        </div>
      </div>

      {/* Main content — map slides left, cards slide in from right */}
      <div className="flex-1 flex min-h-0 relative">

        {/* MAP PANEL: starts centered/full, slides to left 30% */}
        <div
          className="flex items-center justify-center overflow-hidden shrink-0"
          style={{
            width: isRegionSelected ? '30%' : '100%',
            minWidth: isRegionSelected ? '180px' : undefined,
            maxWidth: isRegionSelected ? '280px' : undefined,
            transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div
            className="px-4"
            style={{
              width: isRegionSelected ? '100%' : undefined,
              maxWidth: isRegionSelected ? '100%' : '420px',
              transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <PhilippinesMap
              selectedRegion={selectedRegion}
              onSelectRegion={handleSelectRegion}
              cropToRegion={isRegionSelected ? selectedRegion : undefined}
              landmarks={isRegionSelected ? filtered : []}
              highlightedLandmark={selectedLandmark ?? hoveredLandmark}
              onLandmarkClick={handleLandmarkSelect}
              onLandmarkHover={setHoveredLandmark}
            />
          </div>
        </div>

        {/* CARDS PANEL: slides in from right */}
        <div
          className="overflow-hidden"
          style={{
            width: showCards ? '70%' : '0%',
            opacity: showCards ? 1 : 0,
            flex: showCards ? '1 1 0%' : '0 0 0%',
            transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="h-full flex flex-col overflow-hidden p-4 md:p-6 border-l border-border/50">
            {!selectedLandmark ? (
              /* ── Horizontal card grid ── */
              <div className="flex flex-col h-full">
                <p className="text-sm text-muted-foreground mb-3 sm:hidden">
                  Pick a landmark to visit
                </p>
                <div className="flex-1 flex gap-4 min-h-0">
                  {filtered.map((landmark, index) => (
                    <div
                      key={landmark.id}
                      className="flex-1 min-w-0 animate-fade-in"
                      style={{
                        animationDelay: `${index * 0.12}s`,
                        pointerEvents: cardsReady ? 'auto' : 'none',
                      }}
                      onMouseEnter={() => cardsReady && setHoveredLandmark(landmark.id)}
                      onMouseLeave={() => cardsReady && setHoveredLandmark(null)}
                    >
                      <LandmarkCard
                        landmark={landmark}
                        isSelected={hoveredLandmark === landmark.id}
                        onClick={() => handleLandmarkSelect(landmark.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* ── Expanded selected card ── */
              activeLandmark && (
                <div className="flex h-full min-h-0 animate-fade-in">
                  <div className="flex-1 flex flex-col min-h-0 transition-all duration-500">
                    <div className="flex-1 flex flex-col min-h-0 max-w-2xl mx-auto w-full">
                      {/* Image */}
                      <div className="relative rounded-2xl overflow-hidden mb-4 shrink-0" style={{ height: 'clamp(240px, 45vh, 420px)' }}>
                        <img
                          src={activeLandmark.imageUrl}
                          alt={activeLandmark.name}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            target.parentElement!.classList.add('landmark-img-fallback');
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{activeLandmark.location}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <h3 className="text-2xl md:text-3xl font-bold font-serif mb-2">
                        {activeLandmark.name}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        {activeLandmark.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <span className="w-2 h-2 rounded-full bg-accent/50" />
                        <span>{activeLandmark.hiddenConditions.length} hidden conditions await discovery</span>
                      </div>

                      {/* Confirm / Change buttons */}
                      <div className="flex gap-3 mt-auto">
                        <button
                          onClick={handleBack}
                          className="px-5 py-3 rounded-xl border-2 border-border text-sm font-semibold hover:bg-muted transition-colors"
                        >
                          ← Choose another
                        </button>
                        <button
                          onClick={handleConfirm}
                          className="flex-1 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                          Visit {activeLandmark.name}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
