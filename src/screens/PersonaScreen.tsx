import { Landmark, Persona } from '@/types/exhibit';
import { ExhibitHeader } from '@/components/ExhibitHeader';
import { PersonaCard } from '@/components/PersonaCard';
import { MapPin } from 'lucide-react';

interface PersonaScreenProps {
  landmark: Landmark;
  personas: Persona[];
  onSelect: (persona: Persona) => void;
  onBack: () => void;
}

export function PersonaScreen({ landmark, personas, onSelect, onBack }: PersonaScreenProps) {
  return (
    <div className="exhibit-container min-h-screen">
      <ExhibitHeader
        title="Who Are You Today?"
        subtitle="Experience this visit through the eyes of different visitors. Each persona has unique needs, abilities, and resources."
        showBack
        onBack={onBack}
      />

      {/* Selected landmark indicator */}
      <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 p-3 md:p-4 bg-card rounded-xl max-w-md">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs md:text-sm text-muted-foreground">Visiting</p>
          <p className="font-semibold text-foreground text-sm md:text-base truncate">{landmark.name}, {landmark.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl">
        {personas.map((persona, index) => (
          <div 
            key={persona.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <PersonaCard
              persona={persona}
              onClick={() => onSelect(persona)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
