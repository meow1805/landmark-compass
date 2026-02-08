import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExhibitHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  className?: string;
  centered?: boolean;
}

export function ExhibitHeader({ title, subtitle, showBack, onBack, className, centered = false }: ExhibitHeaderProps) {
  return (
    <header className={cn('mb-8 md:mb-12', centered && 'text-center', className)}>
      {showBack && (
        <button
          onClick={onBack}
          className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors mb-4 touch-target"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <h1 className="exhibit-title mb-3">{title}</h1>
      {subtitle && (
        <p className={cn('exhibit-subtitle max-w-3xl', centered && 'mx-auto')}>{subtitle}</p>
      )}
    </header>
  );
}
