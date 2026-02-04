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
        'persona-card w-full text-left touch-target cursor-pointer',
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
      <div className="p-4 md:p-6 space-y-3 md:space-y-4">
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
          {persona.description}
        </p>
        
        {/* Initial Stats Preview */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 pt-1 md:pt-2">
          <div className="text-center p-2 md:p-3 bg-[hsl(var(--health-bg))] rounded-lg md:rounded-xl">
            <div className="text-base md:text-lg font-bold text-[hsl(var(--health))]">
              {persona.initialHealth}%
            </div>
            <div className="text-xs text-muted-foreground">Health</div>
          </div>
          <div className="text-center p-2 md:p-3 bg-[hsl(var(--stamina-bg))] rounded-lg md:rounded-xl">
            <div className="text-base md:text-lg font-bold text-[hsl(var(--stamina))]">
              {persona.initialStamina}%
            </div>
            <div className="text-xs text-muted-foreground">Stamina</div>
          </div>
          <div className="text-center p-2 md:p-3 bg-[hsl(var(--money-bg))] rounded-lg md:rounded-xl">
            <div className="text-base md:text-lg font-bold text-[hsl(var(--money))]">
              ₱{persona.initialMoney}
            </div>
            <div className="text-xs text-muted-foreground">Budget</div>
          </div>
        </div>
      </div>
    </button>
  );
}
