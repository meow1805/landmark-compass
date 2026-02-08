import { Persona } from '@/types/exhibit';
import { cn } from '@/lib/utils';

interface PersonaCardProps {
  persona: Persona;
  isSelected?: boolean;
  onClick?: () => void;
}

export function PersonaCard({ persona, isSelected, onClick }: PersonaCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'persona-card w-full text-left touch-target cursor-pointer transition-transform duration-200 hover:scale-[1.02]',
        isSelected && 'exhibit-card-selected'
      )}
    >
      {/* Card Header */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 md:p-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="text-4xl md:text-5xl">{persona.avatar}</div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-foreground font-serif">
              {persona.name}
            </h3>
            <p className="text-xs md:text-sm font-medium text-primary">
              {persona.role}
            </p>
          </div>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-4 md:p-6">
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
          {persona.description}
        </p>
      </div>
    </button>
  );
}
