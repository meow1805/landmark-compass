import { useEffect, useMemo, useState } from 'react';
import { IncompleteMapView } from '@/screens/MapTransparency/IncompleteMapView';
import { ImprovedMapView } from '@/screens/MapTransparency/ImprovedMapView';
import { ComparisonView } from '@/screens/MapTransparency/ComparisonView';

type Decision = 'safe' | 'unsure' | 'unprepared';
type Step = 'incomplete' | 'improved' | 'comparison';

const STORAGE_KEY = 'map-transparency-decision';

const MapTransparencyDemo = () => {
  const [step, setStep] = useState<Step>('incomplete');
  const [decision, setDecision] = useState<Decision | null>(null);

  // Load any prior decision from sessionStorage
  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw === 'safe' || raw === 'unsure' || raw === 'unprepared') {
      setDecision(raw);
    }
  }, []);

  const handleDecide = (d: Decision) => {
    setDecision(d);
    sessionStorage.setItem(STORAGE_KEY, d);
    setStep('improved');
  };

  const handleCompare = () => setStep('comparison');

  const content = useMemo(() => {
    switch (step) {
      case 'incomplete':
        return <IncompleteMapView onDecide={handleDecide} />;
      case 'improved':
        return <ImprovedMapView onCompare={handleCompare} />;
      case 'comparison':
        return <ComparisonView decision={(decision ?? 'unsure')} />;
      default:
        return null;
    }
  }, [step, decision]);

  return (
    <div className="min-h-screen bg-background">
      {content}
    </div>
  );
};

export default MapTransparencyDemo;
