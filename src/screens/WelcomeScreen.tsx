import { ExhibitHeader } from '@/components/ExhibitHeader';
import { Map, Users, Eye, BarChart3 } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const steps = [
    { icon: <Map className="w-6 h-6" />, title: 'Choose a Landmark', desc: 'Select a Philippine city landmark to explore' },
    { icon: <Users className="w-6 h-6" />, title: 'Pick Your Persona', desc: 'Experience the visit through different perspectives' },
    { icon: <Eye className="w-6 h-6" />, title: 'Discover Hidden Realities', desc: 'See what online maps don\'t show you' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Understand the Impact', desc: 'Learn how missing information affects visitors' },
  ];

  return (
    <div className="exhibit-container min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center px-4">
        {/* Main Title */}
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Interactive Educational Exhibit
          </span>
          <h1 className="exhibit-title mb-4">
            Beyond the Map
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light leading-relaxed">
            Safety and Accessibility in Philippine City Landmarks
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Online maps show location and hours—but what about stairs, walking distances, 
          shade, or seating? Discover what's missing and why it matters.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 w-full">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="exhibit-card p-6 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="exhibit-button pulse-attention text-xl px-12 py-5"
        >
          Begin Your Journey
        </button>

        {/* Footer note */}
        <p className="mt-8 text-sm text-muted-foreground">
          Touch the screen to start • Educational simulation • 5-7 minutes
        </p>
      </div>
    </div>
  );
}
