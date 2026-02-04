import { Persona } from '@/types/exhibit';

export const personas: Persona[] = [
  {
    id: 'elderly',
    name: 'Lola Carmen',
    role: 'Elderly History Enthusiast',
    description: 'A 72-year-old retired teacher who loves exploring historical sites. She has mild arthritis and needs frequent rest breaks.',
    avatar: '👵',
    initialHealth: 70,
    initialStamina: 50,
    initialMoney: 300,
    vulnerabilities: ['stairs', 'distance', 'heat']
  },
  {
    id: 'parent',
    name: 'Mark & Baby Sofia',
    role: 'Parent with Stroller',
    description: 'A young father traveling with his 2-year-old daughter in a stroller. He needs accessible paths and family facilities.',
    avatar: '👨‍👧',
    initialHealth: 90,
    initialStamina: 70,
    initialMoney: 500,
    vulnerabilities: ['accessibility', 'facilities', 'crowds']
  },
  {
    id: 'limited-stamina',
    name: 'Ana',
    role: 'Visitor with Chronic Fatigue',
    description: 'A 35-year-old office worker with chronic fatigue syndrome. She carefully manages her energy and needs predictable rest stops.',
    avatar: '👩',
    initialHealth: 80,
    initialStamina: 40,
    initialMoney: 400,
    vulnerabilities: ['distance', 'unpredictability', 'standing']
  },
  {
    id: 'tourist',
    name: 'David',
    role: 'First-Time Tourist',
    description: 'A 28-year-old foreign tourist unfamiliar with local conditions. He has good health but limited local knowledge and budget awareness.',
    avatar: '🧑‍🦱',
    initialHealth: 95,
    initialStamina: 85,
    initialMoney: 600,
    vulnerabilities: ['pricing', 'navigation', 'language']
  }
];
