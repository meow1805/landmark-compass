import { useState, useCallback } from 'react';
import { Landmark, Persona, PlayerStats, ScreenType, HiddenCondition } from '@/types/exhibit';
import { landmarks } from '@/data/landmarks';
import { personas } from '@/data/personas';

interface RevealedCondition {
  condition: HiddenCondition;
  healthImpact: number;
  staminaImpact: number;
  moneyImpact: number;
}

export function useExhibitState() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({ health: 100, stamina: 100, money: 500 });
  const [revealedConditions, setRevealedConditions] = useState<RevealedCondition[]>([]);
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0);

  const calculateImpact = useCallback((condition: HiddenCondition, persona: Persona) => {
    const multipliers = condition.personaMultipliers?.[persona.id] || {};
    
    return {
      healthImpact: Math.round(condition.healthImpact * (multipliers.health || 1)),
      staminaImpact: Math.round(condition.staminaImpact * (multipliers.stamina || 1)),
      moneyImpact: Math.round(condition.moneyImpact * (multipliers.money || 1)),
    };
  }, []);

  const selectLandmark = useCallback((landmark: Landmark) => {
    setSelectedLandmark(landmark);
    setCurrentScreen('persona');
  }, []);

  const selectPersona = useCallback((persona: Persona) => {
    setSelectedPersona(persona);
    setPlayerStats({
      health: persona.initialHealth,
      stamina: persona.initialStamina,
      money: persona.initialMoney,
    });
    setCurrentScreen('planning');
  }, []);

  const startVisit = useCallback(() => {
    setCurrentScreen('reveal');
    setCurrentRevealIndex(0);
    setRevealedConditions([]);
  }, []);

  const revealNextCondition = useCallback(() => {
    if (!selectedLandmark || !selectedPersona) return;
    
    const conditions = selectedLandmark.hiddenConditions;
    
    if (currentRevealIndex < conditions.length) {
      const condition = conditions[currentRevealIndex];
      const impacts = calculateImpact(condition, selectedPersona);
      
      setRevealedConditions(prev => [...prev, { condition, ...impacts }]);
      
      setPlayerStats(prev => ({
        health: Math.max(0, Math.min(100, prev.health + impacts.healthImpact)),
        stamina: Math.max(0, Math.min(100, prev.stamina + impacts.staminaImpact)),
        money: Math.max(0, prev.money + impacts.moneyImpact),
      }));
      
      setCurrentRevealIndex(prev => prev + 1);
    }
  }, [selectedLandmark, selectedPersona, currentRevealIndex, calculateImpact]);

  const finishVisit = useCallback(() => {
    setCurrentScreen('outcome');
  }, []);

  const resetExhibit = useCallback(() => {
    setCurrentScreen('welcome');
    setSelectedLandmark(null);
    setSelectedPersona(null);
    setPlayerStats({ health: 100, stamina: 100, money: 500 });
    setRevealedConditions([]);
    setCurrentRevealIndex(0);
  }, []);

  const goBack = useCallback(() => {
    switch (currentScreen) {
      case 'landmark':
        setCurrentScreen('welcome');
        break;
      case 'persona':
        setSelectedLandmark(null);
        setCurrentScreen('landmark');
        break;
      case 'planning':
        setSelectedPersona(null);
        setCurrentScreen('persona');
        break;
      default:
        break;
    }
  }, [currentScreen]);

  return {
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
  };
}
