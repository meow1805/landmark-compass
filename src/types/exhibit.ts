export interface Landmark {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  hiddenConditions: HiddenCondition[];
}

export interface HiddenCondition {
  id: string;
  type: 'stairs' | 'distance' | 'seating' | 'shade' | 'accessibility' | 'transport';
  label: string;
  description: string;
  healthImpact: number;
  staminaImpact: number;
  moneyImpact: number;
  personaMultipliers?: {
    [personaId: string]: {
      health?: number;
      stamina?: number;
      money?: number;
    };
  };
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  initialHealth: number;
  initialStamina: number;
  initialMoney: number;
  vulnerabilities: string[];
}

export interface PlayerStats {
  health: number;
  stamina: number;
  money: number;
}

export type ScreenType = 'welcome' | 'landmark' | 'persona' | 'planning' | 'reveal' | 'outcome';
