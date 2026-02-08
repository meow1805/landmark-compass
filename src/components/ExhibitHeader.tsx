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
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 touch-target"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      )}
      <h1 className="exhibit-title mb-3">{title}</h1>
      {subtitle && (
        <p className={cn('exhibit-subtitle max-w-3xl', centered && 'mx-auto')}>{subtitle}</p>
      )}
    </header>
  );
}
