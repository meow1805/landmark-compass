import { Landmark } from '@/types/exhibit';

export const landmarks: Landmark[] = [
  {
    id: 'rizal-park',
    name: 'Rizal Park',
    location: 'Manila',
    description: 'Historic urban park and national monument.',
    imageUrl: '/placeholder.svg',
    hiddenConditions: [
      {
        id: 'rp-distance',
        type: 'distance',
        label: 'Long Walking Distance',
        description: 'The park spans 58 hectares with main attractions spread across the grounds.',
        healthImpact: -5,
        staminaImpact: -25,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { stamina: 1.5, health: 1.3 },
          'parent': { stamina: 1.3 },
          'limited-stamina': { stamina: 1.8, health: 1.2 }
        }
      },
      {
        id: 'rp-shade',
        type: 'shade',
        label: 'Limited Shaded Areas',
        description: 'Many paths between monuments lack adequate shade during midday.',
        healthImpact: -10,
        staminaImpact: -15,
        moneyImpact: -50,
        personaMultipliers: {
          'elderly': { health: 1.5, stamina: 1.3 },
          'parent': { health: 1.2 }
        }
      },
      {
        id: 'rp-seating',
        type: 'seating',
        label: 'Sparse Seating',
        description: 'Benches are concentrated near food areas, leaving long stretches without rest spots.',
        healthImpact: -5,
        staminaImpact: -20,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { stamina: 1.5, health: 1.2 },
          'limited-stamina': { stamina: 1.6 }
        }
      }
    ]
  },
  {
    id: 'intramuros',
    name: 'Intramuros',
    location: 'Manila',
    description: 'Historic walled city with Spanish colonial architecture.',
    imageUrl: '/placeholder.svg',
    hiddenConditions: [
      {
        id: 'int-stairs',
        type: 'stairs',
        label: 'Multiple Stairways',
        description: 'Fort Santiago and wall walks require climbing steep stairs.',
        healthImpact: -15,
        staminaImpact: -20,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 1.8, stamina: 1.5 },
          'parent': { stamina: 1.4, money: 1.5 },
          'limited-stamina': { stamina: 1.7, health: 1.3 }
        }
      },
      {
        id: 'int-accessibility',
        type: 'accessibility',
        label: 'Cobblestone Paths',
        description: 'Original cobblestone streets are uneven and difficult for wheelchairs or strollers.',
        healthImpact: -5,
        staminaImpact: -15,
        moneyImpact: -100,
        personaMultipliers: {
          'parent': { stamina: 1.5, money: 1.3 },
          'elderly': { health: 1.3, stamina: 1.4 }
        }
      },
      {
        id: 'int-distance',
        type: 'distance',
        label: 'Spread-out Attractions',
        description: 'Key sites are located at opposite ends of the walled area.',
        healthImpact: -5,
        staminaImpact: -20,
        moneyImpact: -80,
        personaMultipliers: {
          'elderly': { stamina: 1.4 },
          'limited-stamina': { stamina: 1.6 }
        }
      }
    ]
  },
  {
    id: 'baguio-mansion',
    name: 'The Mansion',
    location: 'Baguio City',
    description: 'Official summer residence of the Philippine President.',
    imageUrl: '/placeholder.svg',
    hiddenConditions: [
      {
        id: 'bm-stairs',
        type: 'stairs',
        label: 'Steep Approach',
        description: 'The mansion sits on elevated grounds with steep walking paths.',
        healthImpact: -10,
        staminaImpact: -25,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 1.6, stamina: 1.5 },
          'limited-stamina': { stamina: 1.8 }
        }
      },
      {
        id: 'bm-transport',
        type: 'transport',
        label: 'Limited Parking',
        description: 'Visitors may need to walk significant distance from parking areas.',
        healthImpact: 0,
        staminaImpact: -15,
        moneyImpact: -120,
        personaMultipliers: {
          'parent': { money: 1.3 },
          'elderly': { stamina: 1.3 }
        }
      },
      {
        id: 'bm-seating',
        type: 'seating',
        label: 'No Rest Areas',
        description: 'The viewing area lacks benches or designated rest spots.',
        healthImpact: -5,
        staminaImpact: -15,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 1.3, stamina: 1.4 },
          'limited-stamina': { stamina: 1.5 }
        }
      }
    ]
  },
  {
    id: 'vigan-heritage',
    name: 'Vigan Heritage Village',
    location: 'Ilocos Sur',
    description: 'UNESCO World Heritage colonial Spanish town.',
    imageUrl: '/placeholder.svg',
    hiddenConditions: [
      {
        id: 'vh-accessibility',
        type: 'accessibility',
        label: 'Cobblestone Streets',
        description: 'The famous Calle Crisologo has preserved cobblestones difficult for mobility aids.',
        healthImpact: -5,
        staminaImpact: -20,
        moneyImpact: -80,
        personaMultipliers: {
          'parent': { stamina: 1.5, money: 1.4 },
          'elderly': { health: 1.2, stamina: 1.4 }
        }
      },
      {
        id: 'vh-shade',
        type: 'shade',
        label: 'Limited Shade Coverage',
        description: 'Historic street lacks modern shade structures to preserve authenticity.',
        healthImpact: -10,
        staminaImpact: -15,
        moneyImpact: -60,
        personaMultipliers: {
          'elderly': { health: 1.4 },
          'parent': { health: 1.2, money: 1.2 }
        }
      },
      {
        id: 'vh-distance',
        type: 'distance',
        label: 'Extended Walking Route',
        description: 'Complete heritage tour covers multiple blocks of the historic district.',
        healthImpact: -5,
        staminaImpact: -25,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { stamina: 1.5 },
          'limited-stamina': { stamina: 1.7 }
        }
      }
    ]
  },
  {
    id: 'chocolate-hills',
    name: 'Chocolate Hills',
    location: 'Bohol',
    description: 'Iconic geological formation of grass-covered limestone hills.',
    imageUrl: '/placeholder.svg',
    hiddenConditions: [
      {
        id: 'ch-stairs',
        type: 'stairs',
        label: 'Viewing Deck Stairs',
        description: 'The main viewing deck requires climbing 214 steps.',
        healthImpact: -20,
        staminaImpact: -30,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 2.0, stamina: 1.8 },
          'parent': { stamina: 1.5 },
          'limited-stamina': { stamina: 2.0, health: 1.5 }
        }
      },
      {
        id: 'ch-accessibility',
        type: 'accessibility',
        label: 'No Elevator Access',
        description: 'The viewing platform has no alternative to stairs.',
        healthImpact: -10,
        staminaImpact: -10,
        moneyImpact: -200,
        personaMultipliers: {
          'elderly': { money: 1.5 },
          'parent': { money: 1.4, stamina: 1.3 }
        }
      },
      {
        id: 'ch-shade',
        type: 'shade',
        label: 'Exposed Stairway',
        description: 'The entire climb is under direct sunlight with no shelter.',
        healthImpact: -15,
        staminaImpact: -20,
        moneyImpact: -40,
        personaMultipliers: {
          'elderly': { health: 1.5, stamina: 1.3 },
          'limited-stamina': { stamina: 1.4, health: 1.2 }
        }
      }
    ]
  },
  {
    id: 'mayon-volcano',
    name: 'Mayon Volcano Viewpoint',
    location: 'Albay',
    description: 'Perfect cone-shaped active volcano viewing area.',
    imageUrl: '/placeholder.svg',
    hiddenConditions: [
      {
        id: 'mv-transport',
        type: 'transport',
        label: 'Remote Location',
        description: 'Best viewpoints require special transportation arrangements.',
        healthImpact: 0,
        staminaImpact: -10,
        moneyImpact: -150,
        personaMultipliers: {
          'parent': { money: 1.3 },
          'elderly': { money: 1.2 }
        }
      },
      {
        id: 'mv-seating',
        type: 'seating',
        label: 'Minimal Facilities',
        description: 'Popular viewpoints have limited seating and amenities.',
        healthImpact: -5,
        staminaImpact: -15,
        moneyImpact: -80,
        personaMultipliers: {
          'elderly': { stamina: 1.4, health: 1.2 },
          'limited-stamina': { stamina: 1.5 }
        }
      },
      {
        id: 'mv-distance',
        type: 'distance',
        label: 'Uneven Terrain',
        description: 'Walking paths near lava formations are rough and unmarked.',
        healthImpact: -10,
        staminaImpact: -20,
        moneyImpact: 0,
        personaMultipliers: {
          'elderly': { health: 1.4, stamina: 1.5 },
          'parent': { stamina: 1.3 },
          'limited-stamina': { stamina: 1.6, health: 1.3 }
        }
      }
    ]
  }
];
