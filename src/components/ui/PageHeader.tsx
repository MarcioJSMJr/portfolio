import type { ReactNode } from 'react';

const tones = {
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  purple:
    'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
} as const;

interface PageHeaderProps {
  badge: ReactNode;
  title: string;
  description?: string;
  tone?: keyof typeof tones;
}

export function PageHeader({
  badge,
  title,
  description,
  tone = 'blue',
}: PageHeaderProps) {
  return (
    <header className="space-y-4 text-center sm:text-left border-b border-border pb-8">
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium border ${tones[tone]}`}
      >
        {badge}
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
        {title}
      </h1>
      {description ? (
        <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
          {description}
        </p>
      ) : null}
    </header>
  );
}
