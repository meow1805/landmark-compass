import { useState, useCallback, useMemo } from 'react';
import { Landmark, Persona, CharacterConfig, HairColor, SkinTone, BudgetLevel, HealthCondition, Gender, MaleHairStyle, FemaleHairStyle, GlassesStyle, AccessoryStyle, ClothingStyle } from '@/types/exhibit';
import { ExhibitHeader } from '@/components/ExhibitHeader';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import { Button } from '@/components/ui/button';
import { Shuffle, Sparkles, ChevronRight, Heart, Zap, Coins } from 'lucide-react';

interface PersonaScreenProps {
  landmark: Landmark;
  personas: Persona[];
  onSelect: (persona: Persona) => void;
  onBack: () => void;
}

const HAIR_OPTIONS: { value: HairColor; label: string; color: string }[] = [
  { value: 'black', label: 'Black', color: '#1a1a2e' },
  { value: 'brown', label: 'Brown', color: '#5C3317' },
  { value: 'blonde', label: 'Blonde', color: '#D4A537' },
  { value: 'red', label: 'Red', color: '#A0522D' },
  { value: 'gray', label: 'Gray', color: '#9E9E9E' },
  { value: 'white', label: 'White', color: '#E8E8E8' },
];

const SKIN_OPTIONS: { value: SkinTone; label: string; color: string }[] = [
  { value: 'light', label: 'Light', color: '#FDEBD0' },
  { value: 'medium', label: 'Medium', color: '#F5CBA7' },
  { value: 'tan', label: 'Tan', color: '#E0A97F' },
  { value: 'brown', label: 'Brown', color: '#B07D5B' },
  { value: 'dark', label: 'Dark', color: '#7B5539' },
];

const MALE_HAIR_STYLES: { value: MaleHairStyle; label: string; icon: string }[] = [
  { value: 'fonze', label: 'Slicked Back', icon: '💈' },
  { value: 'dougFunny', label: 'Wispy', icon: '〰️' },
  { value: 'mrT', label: 'Mohawk', icon: '🦅' },
  { value: 'turban', label: 'Turban', icon: '🧕' },
  { value: 'mrClean', label: 'Bald', icon: '🥚' },
];

const FEMALE_HAIR_STYLES: { value: FemaleHairStyle; label: string; icon: string }[] = [
  { value: 'pixie', label: 'Pixie', icon: '✂️' },
  { value: 'full', label: 'Full', icon: '💇‍♀️' },
  { value: 'dougFunny', label: 'Wispy', icon: '〰️' },
  { value: 'mrT', label: 'Mohawk', icon: '🦅' },
  { value: 'turban', label: 'Turban', icon: '🧕' },
  { value: 'mrClean', label: 'Bald', icon: '🥚' },
];

const GLASSES_OPTIONS: { value: GlassesStyle; label: string; icon: string }[] = [
  { value: 'none', label: 'None', icon: '🚫' },
  { value: 'round', label: 'Round', icon: '👓' },
  { value: 'square', label: 'Square', icon: '🕶️' },
];

const ACCESSORY_OPTIONS: { value: AccessoryStyle; label: string; icon: string }[] = [
  { value: 'none', label: 'None', icon: '🚫' },
  { value: 'hoop', label: 'Hoop Earrings', icon: '⭕' },
  { value: 'stud', label: 'Stud Earrings', icon: '💎' },
];

const CLOTHING_OPTIONS: { value: ClothingStyle; label: string; icon: string; desc: string }[] = [
  { value: 'pambahay', label: 'Pambahay', icon: '🏠', desc: 'Home clothes' },
  { value: 'casual', label: 'Casual', icon: '👕', desc: 'Everyday wear' },
  { value: 'formal', label: 'Formal', icon: '👔', desc: 'Dressed up' },
  { value: 'sporty', label: 'Sporty', icon: '🏃', desc: 'Athletic wear' },
];

const BUDGET_OPTIONS: { value: BudgetLevel; label: string; amount: number; icon: string }[] = [
  { value: 'backpacker', label: 'Budget', amount: 500, icon: '🎒' },
  { value: 'moderate', label: 'Moderate', amount: 1000, icon: '💼' },
  { value: 'comfortable', label: 'Comfortable', amount: 3000, icon: '💳' },
  { value: 'luxury', label: 'Luxury', amount: 10000, icon: '✨' },
];

const CONDITION_OPTIONS: { value: HealthCondition; label: string; icon: string; description: string }[] = [
  { value: 'asthma', label: 'Asthma', icon: '🫁', description: 'Difficulty with strenuous activity' },
  { value: 'arthritis', label: 'Arthritis', icon: '🦴', description: 'Joint pain when walking far' },
  { value: 'heart-condition', label: 'Heart Condition', icon: '❤️', description: 'Must avoid overexertion' },
  { value: 'chronic-fatigue', label: 'Chronic Fatigue', icon: '😮‍💨', description: 'Tires easily, needs rest' },
  { value: 'vertigo', label: 'Vertigo', icon: '💫', description: 'Problem with heights/stairs' },
  { value: 'heat-sensitivity', label: 'Heat Sensitivity', icon: '🌡️', description: 'Affected by hot weather' },
  { value: 'poor-eyesight', label: 'Poor Eyesight', icon: '👓', description: 'Needs clear signage' },
  { value: 'mobility-impairment', label: 'Mobility Impairment', icon: '🦽', description: 'Needs accessible paths' },
];

const RANDOM_PRESETS: CharacterConfig[] = [
  { name: 'Lola Carmen', age: 72, gender: 'female', hairColor: 'white', skinTone: 'tan', hairStyle: 'pixie', glassesStyle: 'round', hatStyle: 'none', accessoryStyle: 'stud', clothingStyle: 'pambahay', budget: 'moderate', conditions: ['arthritis', 'heat-sensitivity', 'poor-eyesight'] },
  { name: 'Mark', age: 28, gender: 'male', hairColor: 'black', skinTone: 'brown', hairStyle: 'fonze', glassesStyle: 'none', hatStyle: 'none', accessoryStyle: 'none', clothingStyle: 'casual', budget: 'backpacker', conditions: ['asthma'] },
  { name: 'Sofia', age: 19, gender: 'female', hairColor: 'brown', skinTone: 'medium', hairStyle: 'full', glassesStyle: 'none', hatStyle: 'none', accessoryStyle: 'hoop', clothingStyle: 'casual', budget: 'backpacker', conditions: [] },
  { name: 'Dr. Santos', age: 55, gender: 'male', hairColor: 'gray', skinTone: 'tan', hairStyle: 'fonze', glassesStyle: 'square', hatStyle: 'none', accessoryStyle: 'none', clothingStyle: 'formal', budget: 'comfortable', conditions: ['heart-condition'] },
  { name: 'Rico', age: 21, gender: 'male', hairColor: 'black', skinTone: 'brown', hairStyle: 'mrT', glassesStyle: 'none', hatStyle: 'none', accessoryStyle: 'none', clothingStyle: 'sporty', budget: 'backpacker', conditions: [] },
  { name: 'Tita Beth', age: 63, gender: 'female', hairColor: 'white', skinTone: 'medium', hairStyle: 'turban', glassesStyle: 'round', hatStyle: 'none', accessoryStyle: 'stud', clothingStyle: 'formal', budget: 'luxury', conditions: ['vertigo', 'arthritis'] },
  { name: 'Jun', age: 35, gender: 'male', hairColor: 'black', skinTone: 'dark', hairStyle: 'dougFunny', glassesStyle: 'none', hatStyle: 'none', accessoryStyle: 'none', clothingStyle: 'pambahay', budget: 'moderate', conditions: ['chronic-fatigue'] },
  { name: 'Mia', age: 8, gender: 'female', hairColor: 'black', skinTone: 'tan', hairStyle: 'dougFunny', glassesStyle: 'none', hatStyle: 'none', accessoryStyle: 'none', clothingStyle: 'casual', budget: 'moderate', conditions: ['asthma'] },
  { name: 'David', age: 30, gender: 'male', hairColor: 'blonde', skinTone: 'light', hairStyle: 'turban', glassesStyle: 'square', hatStyle: 'none', accessoryStyle: 'none', clothingStyle: 'casual', budget: 'comfortable', conditions: ['heat-sensitivity', 'poor-eyesight'] },
  { name: 'Nanay Linda', age: 68, gender: 'female', hairColor: 'white', skinTone: 'brown', hairStyle: 'dougFunny', glassesStyle: 'round', hatStyle: 'none', accessoryStyle: 'none', clothingStyle: 'pambahay', budget: 'moderate', conditions: ['mobility-impairment', 'heart-condition', 'poor-eyesight'] },
];

function buildPersonaFromConfig(config: CharacterConfig): Persona {
  const age = config.age;
  const conditions = config.conditions;

  let baseHealth = age <= 12 ? 95 : age <= 25 ? 92 : age <= 40 ? 88 : age <= 55 ? 80 : age <= 70 ? 72 : 65;
  if (conditions.includes('heart-condition')) baseHealth -= 15;
  if (conditions.includes('heat-sensitivity')) baseHealth -= 8;
  if (conditions.includes('chronic-fatigue')) baseHealth -= 5;
  baseHealth = Math.max(40, Math.min(100, baseHealth));

  let baseStamina = age <= 12 ? 75 : age <= 25 ? 90 : age <= 40 ? 80 : age <= 55 ? 65 : age <= 70 ? 50 : 40;
  if (conditions.includes('chronic-fatigue')) baseStamina -= 20;
  if (conditions.includes('arthritis')) baseStamina -= 15;
  if (conditions.includes('asthma')) baseStamina -= 12;
  if (conditions.includes('mobility-impairment')) baseStamina -= 18;
  if (conditions.includes('vertigo')) baseStamina -= 8;
  baseStamina = Math.max(20, Math.min(100, baseStamina));

  const budgetAmount = BUDGET_OPTIONS.find(b => b.value === config.budget)?.amount ?? 400;

  let archetypeId = 'tourist';
  if (age >= 60 || conditions.includes('arthritis')) archetypeId = 'elderly';
  else if (conditions.includes('mobility-impairment') || conditions.includes('chronic-fatigue')) archetypeId = 'limited-stamina';
  else if (age <= 12) archetypeId = 'parent';

  const ageLabel = age <= 12 ? 'Child' : age <= 17 ? 'Teenager' : age <= 25 ? 'Young Adult' : age <= 55 ? 'Adult' : 'Senior';
  const condLabels = conditions.map(c => CONDITION_OPTIONS.find(o => o.value === c)?.label).filter(Boolean);
  const roleDesc = condLabels.length > 0
    ? `${ageLabel} with ${condLabels.join(', ')}`
    : `${ageLabel} Visitor`;

  const vulnMap: Record<string, string[]> = {
    'asthma': ['stairs', 'altitude', 'distance'],
    'arthritis': ['stairs', 'distance', 'terrain'],
    'heart-condition': ['stairs', 'altitude', 'distance'],
    'chronic-fatigue': ['distance', 'stairs', 'terrain'],
    'vertigo': ['stairs', 'altitude'],
    'heat-sensitivity': ['shade', 'weather'],
    'poor-eyesight': ['signage', 'terrain'],
    'mobility-impairment': ['accessibility', 'stairs', 'terrain'],
  };
  const vulnerabilities = [...new Set(conditions.flatMap(c => vulnMap[c] ?? []))];

  return {
    id: archetypeId,
    name: config.name || 'Traveler',
    role: roleDesc,
    description: `${config.name || 'A traveler'}, age ${age}. ${condLabels.length > 0 ? `Living with ${condLabels.join(', ').toLowerCase()}.` : 'No health conditions.'}`,
    avatar: '',
    initialHealth: baseHealth,
    initialStamina: baseStamina,
    initialMoney: budgetAmount,
    vulnerabilities,
    mapKnowledge: age >= 60 ? 'medium' : age <= 17 ? 'low' : 'medium',
    characterConfig: config,
  };
}

export function PersonaScreen({ landmark, onSelect, onBack }: PersonaScreenProps) {
  const [config, setConfig] = useState<CharacterConfig>({
    name: '',
    age: 25,
    gender: 'male',
    hairColor: 'black',
    skinTone: 'tan',
    hairStyle: 'fonze',
    glassesStyle: 'none',
    hatStyle: 'none',
    accessoryStyle: 'none',
    clothingStyle: 'casual',
    budget: 'moderate',
    conditions: [],
  });

  const persona = useMemo(() => buildPersonaFromConfig(config), [config]);

  const updateField = useCallback(<K extends keyof CharacterConfig>(key: K, value: CharacterConfig[K]) => {
    setConfig(prev => {
      const next = { ...prev, [key]: value };
      // When gender changes, reset hairStyle to valid option for that gender
      if (key === 'gender') {
        next.hairStyle = value === 'female' ? 'pixie' : 'fonze';
      }
      // When age crosses into senior (60+), auto-suggest white hair (still changeable)
      if (key === 'age' && typeof value === 'number') {
        const wasUnder60 = prev.age < 60;
        const isNow60Plus = (value as number) >= 60;
        if (wasUnder60 && isNow60Plus) {
          next.hairColor = 'white';
        }
      }
      return next;
    });
  }, []);

  const toggleCondition = useCallback((condition: HealthCondition) => {
    setConfig(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition],
    }));
  }, []);

  const randomize = useCallback(() => {
    const preset = RANDOM_PRESETS[Math.floor(Math.random() * RANDOM_PRESETS.length)];
    setConfig({ ...preset });
  }, []);

  const isValid = config.name.trim().length > 0 && config.age >= 5 && config.age <= 100;

  return (
    <div className="exhibit-container min-h-screen">
      <ExhibitHeader
        title="Create Your Character"
        subtitle={`Design your visitor for ${landmark.name}`}
        showBack
        onBack={onBack}
      />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
        {/* ── LEFT: Form ──────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Random button */}
          <button
            onClick={randomize}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
              bg-gradient-to-r from-purple-500/20 to-pink-500/20 
              hover:from-purple-500/30 hover:to-pink-500/30
              border border-purple-500/30 transition-all duration-200 group"
          >
            <Shuffle className="w-5 h-5 text-purple-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-semibold text-sm text-purple-300">Randomize Character</span>
          </button>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gender</label>
            <div className="flex gap-2">
              {(['male', 'female'] as Gender[]).map(g => (
                <button
                  key={g}
                  onClick={() => updateField('gender', g)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all
                    ${config.gender === g
                      ? 'border-purple-500 bg-purple-500/20 text-foreground ring-1 ring-purple-500/40'
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                >
                  <span className="text-base">{g === 'male' ? '♂' : '♀'}</span>
                  {g === 'male' ? 'Male' : 'Female'}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</label>
            <input
              type="text"
              value={config.name}
              onChange={e => updateField('name', e.target.value)}
              placeholder="Enter character name..."
              maxLength={24}
              className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-2.5 text-sm 
                text-foreground placeholder:text-muted-foreground/50
                focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
            />
          </div>

          {/* Age slider + input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Age</label>
              <input
                type="number"
                min={5}
                max={100}
                value={config.age}
                onChange={e => {
                  const v = Math.max(5, Math.min(100, Number(e.target.value) || 5));
                  updateField('age', v);
                }}
                className="w-16 text-sm font-bold text-foreground text-center tabular-nums
                  rounded-lg border border-white/10 bg-white/5 py-0.5
                  focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <input
              type="range"
              min={5}
              max={100}
              value={config.age}
              onChange={e => updateField('age', Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 
                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-purple-500/30"
              style={{
                background: `linear-gradient(to right, #a855f7 ${((config.age - 5) / 95) * 100}%, rgba(255,255,255,0.1) ${((config.age - 5) / 95) * 100}%)`,
              }}
            />
            <div className="relative h-4 text-[10px] text-muted-foreground/60">
              <span className="absolute" style={{ left: '0%' }}>Child</span>
              <span className="absolute -translate-x-1/2" style={{ left: `${((13 - 5) / 95) * 100}%` }}>Teen</span>
              <span className="absolute -translate-x-1/2" style={{ left: `${((21 - 5) / 95) * 100}%` }}>Young Adult</span>
              <span className="absolute -translate-x-1/2" style={{ left: `${((35 - 5) / 95) * 100}%` }}>Adult</span>
              <span className="absolute -translate-x-1/2" style={{ left: `${((60 - 5) / 95) * 100}%` }}>Senior</span>
            </div>
          </div>

          {/* Hair Color */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hair Color</label>
            <div className="flex gap-2 flex-wrap">
              {HAIR_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateField('hairColor', opt.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all
                    ${config.hairColor === opt.value 
                      ? 'border-purple-500 bg-purple-500/20 text-foreground ring-1 ring-purple-500/40' 
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                >
                  <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: opt.color }} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Tone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skin Tone</label>
            <div className="flex gap-2 flex-wrap">
              {SKIN_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateField('skinTone', opt.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all
                    ${config.skinTone === opt.value 
                      ? 'border-purple-500 bg-purple-500/20 text-foreground ring-1 ring-purple-500/40' 
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                >
                  <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: opt.color }} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hair Style (gender-locked) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hair Style</label>
            <div className="flex gap-2 flex-wrap">
              {(config.gender === 'female' ? FEMALE_HAIR_STYLES : MALE_HAIR_STYLES).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateField('hairStyle', opt.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all
                    ${config.hairStyle === opt.value
                      ? 'border-purple-500 bg-purple-500/20 text-foreground ring-1 ring-purple-500/40'
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                >
                  <span className="text-base">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Eyewear */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Eyewear</label>
            <div className="flex gap-2 flex-wrap">
              {GLASSES_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateField('glassesStyle', opt.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all
                    ${config.glassesStyle === opt.value
                      ? 'border-purple-500 bg-purple-500/20 text-foreground ring-1 ring-purple-500/40'
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                >
                  <span className="text-base">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Accessories</label>
            <div className="flex gap-2 flex-wrap">
              {ACCESSORY_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateField('accessoryStyle', opt.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all
                    ${config.accessoryStyle === opt.value
                      ? 'border-purple-500 bg-purple-500/20 text-foreground ring-1 ring-purple-500/40'
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                >
                  <span className="text-base">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clothing Style */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Clothing</label>
            <div className="grid grid-cols-2 gap-2">
              {CLOTHING_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateField('clothingStyle', opt.value)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all
                    ${config.clothingStyle === opt.value
                      ? 'border-purple-500 bg-purple-500/20 text-foreground ring-1 ring-purple-500/40'
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                >
                  <span className="text-base">{opt.icon}</span>
                  <div className="text-left">
                    <div>{opt.label}</div>
                    <div className="text-[10px] opacity-60">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Budget</label>
            <div className="grid grid-cols-2 gap-2">
              {BUDGET_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateField('budget', opt.value)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all
                    ${config.budget === opt.value 
                      ? 'border-emerald-500 bg-emerald-500/20 text-foreground ring-1 ring-emerald-500/40' 
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                >
                  <span className="text-base">{opt.icon}</span>
                  <div className="text-left">
                    <div>{opt.label}</div>
                    <div className="text-[10px] opacity-60">₱{opt.amount}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Health Conditions */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Health Conditions <span className="text-muted-foreground/50 normal-case font-normal">(optional)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CONDITION_OPTIONS.map(opt => {
                const active = config.conditions.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleCondition(opt.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all text-left
                      ${active 
                        ? 'border-red-500/60 bg-red-500/15 text-foreground ring-1 ring-red-500/30' 
                        : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                  >
                    <span className="text-base shrink-0">{opt.icon}</span>
                    <div className="min-w-0">
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-[10px] opacity-50 truncate">{opt.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Preview ──────────────────────── */}
        <div className="lg:w-[340px] shrink-0">
          <div className="lg:sticky lg:top-6 space-y-5">
            {/* Character Preview Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
              {/* Avatar */}
              <div className="flex justify-center pt-6 pb-3 bg-gradient-to-b from-purple-500/10 to-transparent">
                <CharacterAvatar config={config} size={180} />
              </div>
              
              {/* Character Info */}
              <div className="px-5 pb-5 space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground font-serif">
                    {config.name || <span className="text-muted-foreground/50 italic">Your Character</span>}
                  </h3>
                  <p className="text-xs text-purple-400 font-medium mt-0.5">{persona.role}</p>
                </div>

                {/* Stats Preview */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-muted-foreground">Health</span>
                        <span className="font-bold text-foreground">{persona.initialHealth}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: `${persona.initialHealth}%`,
                            background: persona.initialHealth > 70 ? '#22c55e' : persona.initialHealth > 40 ? '#eab308' : '#ef4444',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-muted-foreground">Stamina</span>
                        <span className="font-bold text-foreground">{persona.initialStamina}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: `${persona.initialStamina}%`,
                            background: persona.initialStamina > 70 ? '#22c55e' : persona.initialStamina > 40 ? '#eab308' : '#ef4444',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="font-bold text-foreground">₱{persona.initialMoney}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: `${Math.min(100, (persona.initialMoney / 10000) * 100)}%`,
                            background: '#10b981',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vulnerabilities */}
                {persona.vulnerabilities.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1.5">Vulnerabilities</p>
                    <div className="flex flex-wrap gap-1">
                      {persona.vulnerabilities.map(v => (
                        <span key={v} className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-[10px] font-medium border border-red-500/20">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-muted-foreground/70 leading-relaxed">
                  {persona.description}
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <Button
              className="w-full py-6 text-base font-bold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 
                hover:from-purple-500 hover:to-pink-500 active:from-purple-700 active:to-pink-700 active:scale-95
                shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all
                disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none
                pulse-attention"
              disabled={!isValid}
              onClick={() => onSelect(persona)}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Adventure
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            {!isValid && (
              <p className="text-xs text-center text-amber-400/80 mt-2">
                {config.name.trim().length === 0 ? '⚠ Enter a character name to continue' : '⚠ Age must be between 5 and 100'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
