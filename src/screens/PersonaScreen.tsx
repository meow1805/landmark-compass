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
      <div className="flex items-center gap-3 mb-8 p-4 bg-card rounded-xl max-w-md">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Visiting</p>
          <p className="font-semibold text-foreground">{landmark.name}, {landmark.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {personas.map((persona, index) => (
          <div 
            key={persona.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
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
