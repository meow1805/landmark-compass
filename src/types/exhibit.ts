export type Region = 'luzon' | 'visayas' | 'mindanao';

export interface Landmark {
  id: string;
  name: string;
  location: string;
  region: Region;
  description: string;
  imageUrl: string;
  /** [lat, lng] for map view (e.g. GMaps-style). */
  mapCenter?: [number, number];
  mapZoom?: number;
  hiddenConditions: HiddenCondition[];
}

export interface HiddenCondition {
  id: string;
  type: 'stairs' | 'distance' | 'seating' | 'shade' | 'accessibility' | 'transport' | 'crowd' | 'terrain' | 'weather' | 'cost' | 'safety' | 'wildlife' | 'altitude' | 'water' | 'vendors' | 'signage' | 'restroom';
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

export type MapKnowledgeLevel = 'low' | 'medium' | 'high';

export type HairColor = 'black' | 'brown' | 'blonde' | 'red' | 'gray' | 'white';
export type SkinTone = 'light' | 'medium' | 'tan' | 'brown' | 'dark';
export type AgeGroup = 'child' | 'teen' | 'young-adult' | 'adult' | 'middle-aged' | 'senior';
export type Gender = 'male' | 'female';
export type HealthCondition = 'asthma' | 'arthritis' | 'heart-condition' | 'chronic-fatigue' | 'vertigo' | 'heat-sensitivity' | 'poor-eyesight' | 'mobility-impairment';
export type BudgetLevel = 'backpacker' | 'moderate' | 'comfortable' | 'luxury';

export type MaleHairStyle = 'normal' | 'thick' | 'mohawk';
export type FemaleHairStyle = 'womanLong' | 'womanShort' | 'normal';
export type HairStyle = MaleHairStyle | FemaleHairStyle;
export type GlassesStyle = 'none' | 'round' | 'square';
export type HatStyle = 'none' | 'beanie' | 'turban';
export type AccessoryStyle = 'none' | 'earrings' | 'headphones' | 'scar' | 'bandana';
export type ClothingStyle = 'pambahay' | 'casual' | 'formal' | 'sporty';

export interface CharacterConfig {
  name: string;
  age: number;
  gender: Gender;
  hairColor: HairColor;
  hairStyle: HairStyle;
  skinTone: SkinTone;
  budget: BudgetLevel;
  conditions: HealthCondition[];
  glassesStyle: GlassesStyle;
  hatStyle: HatStyle;
  accessoryStyle: AccessoryStyle;
  clothingStyle: ClothingStyle;
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
  mapKnowledge: MapKnowledgeLevel;
  /** Character creation config (if custom-made) */
  characterConfig?: CharacterConfig;
}

export interface PlayerStats {
  health: number;
  stamina: number;
  money: number;
}

export type ScreenType = 'welcome' | 'landmark' | 'persona' | 'planning' | 'reveal' | 'outcome';
