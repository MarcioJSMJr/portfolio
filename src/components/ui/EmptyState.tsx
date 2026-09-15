import type { ReactNode } from 'react';

const tones = {
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  purple:
    'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
} as const;

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: keyof typeof tones;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  tone = 'blue',
}: EmptyStateProps) {
  return (
    <div className="p-12 sm:p-16 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-border text-center space-y-4 max-w-lg mx-auto">
      <div
        className={`w-12 h-12 rounded-2xl border flex items-center justify-center mx-auto ${tones[tone]}`}
      >
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        {description ? (
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
