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
        'exhibit-card group w-full h-full text-left touch-target cursor-pointer overflow-hidden relative rounded-xl',
        isSelected && 'exhibit-card-selected ring-2 ring-primary/50'
      )}
    >
      {/* Full background image */}
      <img
        src={landmark.imageUrl}
        alt={landmark.name}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          target.parentElement!.classList.add('landmark-img-fallback');
        }}
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-colors duration-300 group-hover:from-black/70" />

      {/* Location badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full z-10">
        <MapPin className="w-3 h-3 text-primary" />
        <span className="text-xs font-medium text-foreground">{landmark.location}</span>
      </div>

      {/* Content overlaid at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 flex flex-col gap-1 z-10">
        <h3 className="text-sm md:text-base font-bold text-white font-serif leading-tight drop-shadow-md">
          {landmark.name}
        </h3>
        <p className="text-xs text-white/80 leading-relaxed line-clamp-2 drop-shadow-sm">
          {landmark.description}
        </p>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
          <span>{landmark.hiddenConditions.length} hidden conditions</span>
        </div>
      </div>
    </button>
  );
}
