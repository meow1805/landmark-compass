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
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center px-4 py-6 md:py-8">
        {/* Main Title */}
        <div className="mb-6 md:mb-8">
          <h1 className="exhibit-title mb-3 md:mb-4">
            More Than a Location: Making City Landmark Information Accessible
          </h1>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-6 md:mb-12 leading-relaxed">
          Open to the public. Unclear to navigate. Without full details, visitors cannot plan safely or confidently.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12 w-full">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="exhibit-card p-4 md:p-6 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 md:mb-4">
                {step.icon}
              </div>
              <h3 className="font-semibold text-foreground text-sm md:text-base mb-1 md:mb-2">{step.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground hidden md:block">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="exhibit-button pulse-attention text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 w-full md:w-auto"
        >
          Begin Your Journey
        </button>

        {/* Footer note */}
        <p className="mt-6 md:mt-8 text-xs md:text-sm text-muted-foreground">
          Touch to start • 5-7 minutes
        </p>
      </div>
    </div>
  );
}
