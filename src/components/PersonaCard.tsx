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
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{persona.avatar}</div>
          <div>
            <h3 className="text-xl font-bold text-foreground font-serif">
              {persona.name}
            </h3>
            <p className="text-sm font-medium text-primary">
              {persona.role}
            </p>
          </div>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-6 space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {persona.description}
        </p>
        
        {/* Initial Stats Preview */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="text-center p-3 bg-[hsl(var(--health-bg))] rounded-xl">
            <div className="text-lg font-bold text-[hsl(var(--health))]">
              {persona.initialHealth}%
            </div>
            <div className="text-xs text-muted-foreground">Health</div>
          </div>
          <div className="text-center p-3 bg-[hsl(var(--stamina-bg))] rounded-xl">
            <div className="text-lg font-bold text-[hsl(var(--stamina))]">
              {persona.initialStamina}%
            </div>
            <div className="text-xs text-muted-foreground">Stamina</div>
          </div>
          <div className="text-center p-3 bg-[hsl(var(--money-bg))] rounded-xl">
            <div className="text-lg font-bold text-[hsl(var(--money))]">
              ₱{persona.initialMoney}
            </div>
            <div className="text-xs text-muted-foreground">Budget</div>
          </div>
        </div>
      </div>
    </button>
  );
}
