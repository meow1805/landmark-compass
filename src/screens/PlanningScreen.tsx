import { Landmark, Persona, PlayerStats } from '@/types/exhibit';
import { ExhibitHeader } from '@/components/ExhibitHeader';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import { StatBar } from '@/components/StatBar';
import { MapPin, Clock, Play, Star, DollarSign, Navigation, Phone, Globe, ChevronRight } from 'lucide-react';

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
        title="With this information, can you plan a safe visit?"
        subtitle="This is all Google Maps gives you. Look carefully, would this be enough?"
        showBack
        onBack={onBack}
      />

      <div className="max-w-6xl mx-auto flex gap-4 md:gap-6 items-start">

        {/* Left: Compact persona card */}
        <div className="w-48 md:w-56 shrink-0 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 md:p-4">
            <div className="flex flex-col items-center text-center mb-3">
              <CharacterAvatar config={persona.characterConfig ?? {}} size={56} />
              <h3 className="text-sm font-bold text-foreground font-serif mt-2 leading-tight">{persona.name}</h3>
              <p className="text-purple-400 font-medium text-[11px]">{persona.role}</p>
            </div>

            {/* Vulnerabilities */}
            {persona.vulnerabilities.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1 justify-center">
                  {persona.vulnerabilities.map(v => (
                    <span key={v} className="px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400 text-[9px] font-medium border border-red-500/20">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Compact stats */}
            <div className="space-y-2">
              <StatBar label="Health" value={stats.health} maxValue={100} type="health" />
              <StatBar label="Stamina" value={stats.stamina} maxValue={100} type="stamina" />
              <StatBar label="Budget" value={stats.money} maxValue={Math.max(stats.money, 10000)} type="money" />
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl text-sm font-bold
              bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
              shadow-lg shadow-purple-500/25 transition-all duration-200 text-white
              hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.01] active:scale-[0.99]
              pulse-attention"
          >
            <Play className="w-4 h-4" />
            Begin Visit
          </button>
          <p className="text-xs text-center text-amber-400/90 font-medium leading-snug">
            See what really awaits you at this landmark
          </p>
        </div>

        {/* Right: Big Google Maps phone-style view */}
        <div className="flex-1 min-w-0">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            {/* Google Maps embed. tall like a phone map */}
            <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 55vh, 520px)' }}>
              <iframe
                title={`Map of ${landmark.name}`}
                src={`https://maps.google.com/maps?q=${landmark.mapCenter[0]},${landmark.mapCenter[1]}&z=${landmark.mapZoom ?? 15}&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* Fake GMaps top bar */}
              <div className="absolute top-0 inset-x-0 px-3 py-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur flex items-center gap-2 pointer-events-none">
                <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Navigation className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{landmark.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{landmark.location}, Philippines</p>
                </div>
              </div>
            </div>

            {/* Google Maps-style info panel */}
            <div className="p-4 md:p-5 space-y-3">
              {/* Place name + rating row */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground">{landmark.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-yellow-500">4.5</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4].map(i => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    ))}
                    <Star className="w-3.5 h-3.5 fill-yellow-500/40 text-yellow-500/40" />
                  </div>
                  <span className="text-xs text-muted-foreground">(2.1K reviews)</span>
                  <span className="text-xs text-muted-foreground">· Tourist attraction</span>
                </div>
              </div>

              {/* Info rows - Google Maps style */}
              <div className="space-y-2 border-t border-white/10 pt-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground">{landmark.location}, Philippines</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-green-500 shrink-0" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-green-500">Open</span>
                    <span className="text-sm text-muted-foreground">· Closes 5 PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground">Entrance fee may apply</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-blue-400">Contact not listed</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-blue-400 truncate">tourism.gov.ph</span>
                </div>
              </div>

              {/* Action buttons row - GMaps style */}
              <div className="flex gap-2 border-t border-white/10 pt-3">
                <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-blue-500/10 flex-1 cursor-default">
                  <Navigation className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-medium text-blue-400">Directions</span>
                </div>
                <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-blue-500/10 flex-1 cursor-default">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-medium text-blue-400">Call</span>
                </div>
                <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-blue-500/10 flex-1 cursor-default">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-medium text-blue-400">Website</span>
                </div>
                <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-blue-500/10 flex-1 cursor-default">
                  <Star className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-medium text-blue-400">Save</span>
                </div>
              </div>

              {/* Description snippet */}
              <div className="border-t border-white/10 pt-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{landmark.description}</p>
                <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm text-amber-400 text-center font-semibold">
                    This is all Google Maps shows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
