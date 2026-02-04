import { Landmark } from '@/types/exhibit';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface LandmarkCardProps {
  landmark: Landmark;
  isSelected?: boolean;
  onClick?: () => void;
}

export function LandmarkCard({ landmark, isSelected, onClick }: LandmarkCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'exhibit-card w-full text-left touch-target cursor-pointer overflow-hidden',
        isSelected && 'exhibit-card-selected'
      )}
    >
      {/* Image placeholder with gradient */}
      <div className="relative h-40 rounded-xl overflow-hidden mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/30 to-accent/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-30">🏛️</span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{landmark.location}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-foreground font-serif mb-2">
        {landmark.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {landmark.description}
      </p>
      
      {/* Hidden conditions indicator */}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="w-2 h-2 rounded-full bg-accent/50" />
        <span>{landmark.hiddenConditions.length} conditions not shown in online map</span>
      </div>
    </button>
  );
}
