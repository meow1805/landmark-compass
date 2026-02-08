import { useState } from 'react';

type NavDirection = 'left' | 'right' | 'straight';

interface SketchMapGameProps {
  characterAvatar: string;
  currentDirection: NavDirection | null;
  onChooseDirection: (dir: NavDirection) => void;
  canNavigate: boolean;
  rain: boolean;
}

// Positions as % of 320x200 for the character overlay
const FORK_POSITIONS: Record<NavDirection, { left: string; top: string }> = {
  left: { left: '14%', top: '30%' },
  straight: { left: '47%', top: '4%' },
  right: { left: '78%', top: '30%' },
};
const CENTER = { left: '47%', top: '46%' };

/** Sketch/cartoon fork: one junction with three paths. Character at center; on choose, animate along path then callback. */
export function SketchMapGame({
  characterAvatar,
  currentDirection,
  onChooseDirection,
  canNavigate,
  rain,
}: SketchMapGameProps) {
  const [animating, setAnimating] = useState<NavDirection | null>(null);
  const [charPos, setCharPos] = useState(CENTER);

  const handleClick = (dir: NavDirection) => {
    if (!canNavigate || animating) return;
    setAnimating(dir);
    setCharPos(FORK_POSITIONS[dir]);
    onChooseDirection(dir);
    setTimeout(() => {
      setAnimating(null);
      setCharPos(CENTER);
    }, 800);
  };

  return (
    <div className="sketch-map-game">
      <div className="sketch-map-paper">
        {rain && (
          <div className="sketch-map-rain">
            <span className="text-xs font-medium opacity-90">Rain</span>
          </div>
        )}
        <svg viewBox="0 0 320 200" className="sketch-map-svg" aria-hidden>
          <ellipse cx="160" cy="100" rx="85" ry="55" fill="hsl(35 28% 92%)" stroke="hsl(30 25% 75%)" strokeWidth="2" className="sketch-path-bg" />
          <path d="M 160 100 Q 80 95 55 70" fill="none" stroke="hsl(30 25% 70%)" strokeWidth="3" strokeLinecap="round" className="sketch-path" />
          <path d="M 160 100 Q 160 55 160 25" fill="none" stroke="hsl(30 25% 70%)" strokeWidth="3" strokeLinecap="round" className="sketch-path" />
          <path d="M 160 100 Q 240 95 265 70" fill="none" stroke="hsl(30 25% 70%)" strokeWidth="3" strokeLinecap="round" className="sketch-path" />
          <circle cx="160" cy="100" r="22" fill="hsl(35 30% 96%)" stroke="hsl(30 25% 65%)" strokeWidth="2" className="sketch-junction" />
        </svg>
        <div
          className="sketch-character"
          style={{ left: charPos.left, top: charPos.top }}
          role="img"
          aria-label="Your character"
        >
          <span className="sketch-character-emoji">{characterAvatar}</span>
        </div>
        <div className="sketch-map-fork-label">
          <span className="text-xs font-medium text-muted-foreground">You’re at a fork. Choose a path.</span>
        </div>
      </div>
      <div className="sketch-map-buttons">
        <button
          type="button"
          onClick={() => handleClick('left')}
          disabled={!canNavigate || !!animating}
          className="sketch-map-btn sketch-map-btn-left"
        >
          ← Left
        </button>
        <button
          type="button"
          onClick={() => handleClick('straight')}
          disabled={!canNavigate || !!animating}
          className="sketch-map-btn sketch-map-btn-straight"
        >
          Straight
        </button>
        <button
          type="button"
          onClick={() => handleClick('right')}
          disabled={!canNavigate || !!animating}
          className="sketch-map-btn sketch-map-btn-right"
        >
          Right →
        </button>
      </div>
    </div>
  );
}
