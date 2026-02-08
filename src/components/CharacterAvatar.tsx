import Avatar, { genConfig } from 'react-nice-avatar';
import { CharacterConfig, HairColor, SkinTone, Gender } from '@/types/exhibit';
import { useMemo } from 'react';

interface CharacterAvatarProps {
  config: Partial<CharacterConfig>;
  size?: number;
  className?: string;
}

// Map our hair colors to hex for the avatar
const HAIR_COLOR_MAP: Record<HairColor, string> = {
  black: '#2C3E50',
  brown: '#6D4C2E',
  blonde: '#D4A537',
  red: '#B85C3A',
  gray: '#9E9E9E',
  white: '#E0E0E0',
};

// Map our skin tones to face colors
const SKIN_COLOR_MAP: Record<SkinTone, string> = {
  light: '#FDEBD0',
  medium: '#F5CBA7',
  tan: '#E0A97F',
  brown: '#B07D5B',
  dark: '#7B5539',
};

// Gender-aware clothing: female gets distinct colors from male
const CLOTHING_MAP: Record<string, Record<Gender, { shirtStyle: string; shirtColor: string }>> = {
  pambahay: {
    male:   { shirtStyle: 'short', shirtColor: '#78909C' },   // gray tank
    female: { shirtStyle: 'short', shirtColor: '#F48FB1' },   // pink tank
  },
  casual: {
    male:   { shirtStyle: 'hoody', shirtColor: '#5C6BC0' },   // indigo hoodie
    female: { shirtStyle: 'hoody', shirtColor: '#CE93D8' },   // lavender hoodie
  },
  formal: {
    male:   { shirtStyle: 'polo', shirtColor: '#1A237E' },    // dark navy polo
    female: { shirtStyle: 'polo', shirtColor: '#7B1FA2' },    // plum polo
  },
  sporty: {
    male:   { shirtStyle: 'short', shirtColor: '#E53935' },   // red athletic
    female: { shirtStyle: 'short', shirtColor: '#00ACC1' },   // teal athletic
  },
};

export function CharacterAvatar({ config, size = 200, className = '' }: CharacterAvatarProps) {
  const gender = config.gender ?? 'male';
  const age = config.age ?? 25;
  const isFemale = gender === 'female';
  const conditions = config.conditions ?? [];

  const effectiveHairColor = HAIR_COLOR_MAP[config.hairColor ?? 'black'];
  const faceColor = SKIN_COLOR_MAP[config.skinTone ?? 'tan'];
  const hairStyle = config.hairStyle ?? (isFemale ? 'womanLong' : 'normal');
  const glassesStyle = config.glassesStyle ?? (conditions.includes('poor-eyesight') ? 'round' : 'none');
  const hatStyle = config.hatStyle ?? 'none';
  const accessoryStyle = config.accessoryStyle ?? 'none';

  // Gender-aware clothing
  const clothingKey = config.clothingStyle ?? 'casual';
  const clothing = CLOTHING_MAP[clothingKey]?.[gender] ?? CLOTHING_MAP.casual[gender];

  // Gender-differentiated face features
  const eyeStyle = isFemale ? 'circle' : 'oval';
  const noseStyle = isFemale ? 'round' : (age < 13 ? 'short' : 'long');
  const mouthStyle = age < 13 ? 'laugh' : (isFemale ? 'peace' : 'smile');
  const eyeBrowStyle = isFemale ? 'upWoman' : 'up';

  // Wrinkle tiers
  const wrinkleTier = age >= 65 ? 3 : age >= 50 ? 2 : age >= 35 ? 1 : 0;

  // Stable base — only regenerate when sex changes
  const baseConfig = useMemo(() => genConfig({
    sex: isFemale ? 'woman' : 'man',
  }), [isFemale]);

  const avatarConfig = useMemo(() => ({
    ...baseConfig,
    sex: (isFemale ? 'woman' : 'man') as 'woman' | 'man',
    faceColor,
    hairColor: effectiveHairColor,
    hairColorRandom: false,
    hairStyle: hairStyle as any,
    hatStyle: hatStyle as any,
    hatColor: '#4A4A4A',
    eyeStyle: eyeStyle as any,
    eyeBrowStyle: eyeBrowStyle as any,
    mouthStyle: mouthStyle as any,
    glassesStyle: glassesStyle as any,
    noseStyle: noseStyle as any,
    shirtStyle: clothing.shirtStyle as any,
    shirtColor: clothing.shirtColor,
    bgColor: 'transparent',
    isGradient: false,
    earSize: age < 13 ? 'small' as any : 'big' as any,
  }), [baseConfig, isFemale, faceColor, effectiveHairColor, hairStyle, hatStyle, glassesStyle, eyeStyle, eyeBrowStyle, mouthStyle, noseStyle, clothing.shirtStyle, clothing.shirtColor, age]);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Background circle */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 30%, rgba(124,111,234,0.25), rgba(53,36,102,0.55))',
          border: '2px solid rgba(255,255,255,0.12)',
        }}
      />

      {/* Avatar */}
      <Avatar style={{ width: size, height: size }} shape="circle" {...avatarConfig} />

      {/* ── SVG Overlays ── */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Female eyelashes */}
        {isFemale && (
          <>
            {/* Left eye lashes */}
            <path d="M 73 86 L 70 82" stroke="#2C3E50" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
            <path d="M 77 84.5 L 75 80" stroke="#2C3E50" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
            <path d="M 81 84 L 81 80" stroke="#2C3E50" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
            {/* Right eye lashes */}
            <path d="M 119 84 L 119 80" stroke="#2C3E50" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
            <path d="M 123 84.5 L 125 80" stroke="#2C3E50" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
            <path d="M 127 86 L 130 82" stroke="#2C3E50" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
          </>
        )}

        {/* ── Wrinkles ── */}
        {wrinkleTier >= 1 && (
          <path d="M 72 68 Q 100 64 128 68" stroke="#5D4037" strokeWidth={wrinkleTier >= 3 ? 1.4 : 1} opacity={wrinkleTier >= 3 ? 0.28 : wrinkleTier >= 2 ? 0.2 : 0.12} strokeLinecap="round" />
        )}
        {wrinkleTier >= 2 && (
          <>
            <path d="M 75 74 Q 100 71 125 74" stroke="#5D4037" strokeWidth={wrinkleTier >= 3 ? 1.2 : 0.9} opacity={wrinkleTier >= 3 ? 0.24 : 0.15} strokeLinecap="round" />
            {/* Crow's feet */}
            <path d="M 62 90 Q 58 86 55 83" stroke="#5D4037" strokeWidth={0.9} opacity={wrinkleTier >= 3 ? 0.25 : 0.15} strokeLinecap="round" />
            <path d="M 62 91 Q 57 90 53 88" stroke="#5D4037" strokeWidth={0.8} opacity={wrinkleTier >= 3 ? 0.22 : 0.12} strokeLinecap="round" />
            <path d="M 138 90 Q 142 86 145 83" stroke="#5D4037" strokeWidth={0.9} opacity={wrinkleTier >= 3 ? 0.25 : 0.15} strokeLinecap="round" />
            <path d="M 138 91 Q 143 90 147 88" stroke="#5D4037" strokeWidth={0.8} opacity={wrinkleTier >= 3 ? 0.22 : 0.12} strokeLinecap="round" />
            {/* Nasolabial folds */}
            <path d="M 82 108 Q 78 118 80 130" stroke="#5D4037" strokeWidth={wrinkleTier >= 3 ? 1.3 : 1} opacity={wrinkleTier >= 3 ? 0.25 : 0.15} strokeLinecap="round" />
            <path d="M 118 108 Q 122 118 120 130" stroke="#5D4037" strokeWidth={wrinkleTier >= 3 ? 1.3 : 1} opacity={wrinkleTier >= 3 ? 0.25 : 0.15} strokeLinecap="round" />
          </>
        )}
        {wrinkleTier >= 3 && (
          <>
            <path d="M 78 80 Q 100 77.5 122 80" stroke="#5D4037" strokeWidth={1} opacity={0.18} strokeLinecap="round" />
            <path d="M 74 97 Q 80 99 88 97" stroke="#5D4037" strokeWidth={0.8} opacity={0.18} strokeLinecap="round" />
            <path d="M 112 97 Q 120 99 126 97" stroke="#5D4037" strokeWidth={0.8} opacity={0.18} strokeLinecap="round" />
          </>
        )}

        {/* ── Accessory: Earrings ── */}
        {accessoryStyle === 'earrings' && (
          <>
            {/* Left earring — small hoop */}
            <circle cx={54} cy={105} r={4.5} stroke="#FFD700" strokeWidth={1.8} fill="none" opacity={0.85} />
            <circle cx={54} cy={109} r={1.5} fill="#FFD700" opacity={0.9} />
            {/* Right earring */}
            <circle cx={146} cy={105} r={4.5} stroke="#FFD700" strokeWidth={1.8} fill="none" opacity={0.85} />
            <circle cx={146} cy={109} r={1.5} fill="#FFD700" opacity={0.9} />
          </>
        )}

        {/* ── Accessory: Headphones ── */}
        {accessoryStyle === 'headphones' && (
          <>
            {/* Headband arc */}
            <path d="M 52 82 Q 52 42 100 40 Q 148 42 148 82" stroke="#333" strokeWidth={4.5} fill="none" opacity={0.85} strokeLinecap="round" />
            {/* Left ear cup */}
            <rect x={42} y={80} width={16} height={22} rx={5} fill="#444" stroke="#333" strokeWidth={1.5} opacity={0.9} />
            <rect x={45} y={84} width={10} height={14} rx={3} fill="#666" opacity={0.6} />
            {/* Right ear cup */}
            <rect x={142} y={80} width={16} height={22} rx={5} fill="#444" stroke="#333" strokeWidth={1.5} opacity={0.9} />
            <rect x={145} y={84} width={10} height={14} rx={3} fill="#666" opacity={0.6} />
          </>
        )}

        {/* ── Accessory: Scar ── */}
        {accessoryStyle === 'scar' && (
          <>
            {/* Diagonal scar across left cheek */}
            <path d="M 70 100 L 82 115" stroke="#8D6E63" strokeWidth={2} opacity={0.45} strokeLinecap="round" />
            {/* Cross-hatch stitch marks */}
            <path d="M 72 103 L 76 101" stroke="#8D6E63" strokeWidth={1} opacity={0.3} strokeLinecap="round" />
            <path d="M 74 107 L 78 105" stroke="#8D6E63" strokeWidth={1} opacity={0.3} strokeLinecap="round" />
            <path d="M 77 111 L 81 109" stroke="#8D6E63" strokeWidth={1} opacity={0.3} strokeLinecap="round" />
          </>
        )}

        {/* ── Accessory: Bandana ── */}
        {accessoryStyle === 'bandana' && (
          <>
            {/* Bandana band across forehead */}
            <path d="M 56 72 Q 100 62 144 72" stroke="#E53935" strokeWidth={8} opacity={0.8} strokeLinecap="round" />
            <path d="M 56 72 Q 100 64 144 72" stroke="#C62828" strokeWidth={2} opacity={0.5} strokeLinecap="round" />
            {/* Knot on the side */}
            <circle cx={145} cy={76} r={4} fill="#E53935" opacity={0.8} />
            {/* Tail strips */}
            <path d="M 148 78 Q 156 86 152 96" stroke="#E53935" strokeWidth={3} opacity={0.7} strokeLinecap="round" fill="none" />
            <path d="M 147 80 Q 160 84 158 94" stroke="#E53935" strokeWidth={2.5} opacity={0.6} strokeLinecap="round" fill="none" />
          </>
        )}
      </svg>

      {/* Condition badges */}
      {conditions.length > 0 && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          {conditions.slice(0, 4).map((cond) => {
            const icons: Record<string, string> = {
              'asthma': '🫁', 'arthritis': '🦴', 'heart-condition': '❤️',
              'chronic-fatigue': '😮‍💨', 'vertigo': '💫', 'heat-sensitivity': '🌡️',
              'poor-eyesight': '👓', 'mobility-impairment': '🦽',
            };
            return (
              <span
                key={cond}
                className="flex items-center justify-center w-5 h-5 rounded-full text-[9px] leading-none"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {icons[cond] || '⚠️'}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
