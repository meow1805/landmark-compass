import { useExhibitState } from '@/hooks/useExhibitState';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { LandmarkScreen } from '@/screens/LandmarkScreen';
import { PersonaScreen } from '@/screens/PersonaScreen';
import { PlanningScreen } from '@/screens/PlanningScreen';
import { RevealScreen } from '@/screens/RevealScreen';
import { OutcomeScreen } from '@/screens/OutcomeScreen';

const Index = () => {
  const {
    currentScreen,
    setCurrentScreen,
    selectedLandmark,
    selectedPersona,
    playerStats,
    revealedConditions,
    currentRevealIndex,
    landmarks,
    personas,
    selectLandmark,
    selectPersona,
    startVisit,
    revealNextCondition,
    finishVisit,
    resetExhibit,
    goBack,
  } = useExhibitState();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen onStart={() => setCurrentScreen('landmark')} />
        );

      case 'landmark':
        return (
          <LandmarkScreen
            landmarks={landmarks}
            onSelect={selectLandmark}
            onBack={goBack}
          />
        );

      case 'persona':
        return selectedLandmark ? (
          <PersonaScreen
            landmark={selectedLandmark}
            personas={personas}
            onSelect={selectPersona}
            onBack={goBack}
          />
        ) : null;

      case 'planning':
        return selectedLandmark && selectedPersona ? (
          <PlanningScreen
            landmark={selectedLandmark}
            persona={selectedPersona}
            stats={playerStats}
            onStart={startVisit}
            onBack={goBack}
          />
        ) : null;

      case 'reveal':
        return selectedLandmark && selectedPersona ? (
          <RevealScreen
            landmark={selectedLandmark}
            persona={selectedPersona}
            stats={playerStats}
            revealedConditions={revealedConditions}
            currentRevealIndex={currentRevealIndex}
            onRevealNext={revealNextCondition}
            onFinish={finishVisit}
          />
        ) : null;

      case 'outcome':
        return selectedLandmark && selectedPersona ? (
          <OutcomeScreen
            landmark={selectedLandmark}
            persona={selectedPersona}
            stats={playerStats}
            initialStats={{
              health: selectedPersona.initialHealth,
              stamina: selectedPersona.initialStamina,
              money: selectedPersona.initialMoney,
            }}
            revealedConditions={revealedConditions}
            onReset={resetExhibit}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
};

export default Index;
