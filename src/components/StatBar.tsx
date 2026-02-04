import { cn } from '@/lib/utils';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  type: 'health' | 'stamina' | 'money';
  showChange?: number;
  className?: string;
}

export function StatBar({ label, value, maxValue, type, showChange, className }: StatBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
  
  const getIcon = () => {
    switch (type) {
      case 'health': return '❤️';
      case 'stamina': return '⚡';
      case 'money': return '💰';
    }
  };

  const getValueDisplay = () => {
    if (type === 'money') {
      return `₱${value}`;
    }
    return `${Math.round(value)}%`;
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-base font-medium text-foreground">
          <span className="text-xl">{getIcon()}</span>
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">
            {getValueDisplay()}
          </span>
          {showChange !== undefined && showChange !== 0 && (
            <span className={cn(
              'text-sm font-medium px-2 py-0.5 rounded-full animate-fade-in',
              showChange < 0 ? 'bg-destructive/10 text-destructive' : 'bg-health/10 text-health'
            )}>
              {showChange > 0 ? '+' : ''}{type === 'money' ? `₱${showChange}` : showChange}
            </span>
          )}
        </div>
      </div>
      <div className={cn('stat-bar', `stat-bar-${type}`)}>
        <div 
          className={cn('stat-bar-fill', showChange && showChange < 0 && 'bar-decrease')}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
