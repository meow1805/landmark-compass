import { Landmark } from '@/types/exhibit';
import { ExhibitHeader } from '@/components/ExhibitHeader';
import { LandmarkCard } from '@/components/LandmarkCard';

interface LandmarkScreenProps {
  landmarks: Landmark[];
  onSelect: (landmark: Landmark) => void;
  onBack: () => void;
}

export function LandmarkScreen({ landmarks, onSelect, onBack }: LandmarkScreenProps) {
  return (
    <div className="exhibit-container min-h-screen">
      <ExhibitHeader
        title="Choose Your Destination"
        subtitle="Select a Philippine landmark to explore. Each location has its own unique challenges that visitors face—challenges often hidden from online maps."
        showBack
        onBack={onBack}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {landmarks.map((landmark, index) => (
          <div 
            key={landmark.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <LandmarkCard
              landmark={landmark}
              onClick={() => onSelect(landmark)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
