import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high';
  className?: string;
}

export default function RiskBadge({ level, className }: RiskBadgeProps) {
  const { t } = useTranslation();

  const colorClasses = {
    low: 'bg-risk-low text-risk-low-foreground',
    medium: 'bg-risk-medium text-risk-medium-foreground',
    high: 'bg-risk-high text-risk-high-foreground'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        colorClasses[level],
        className
      )}
    >
      {t(`sidebar.${level}`)}
    </span>
  );
}
