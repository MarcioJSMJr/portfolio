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
    <header className="space-y-4 text-left border-b border-border pb-8">
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium border ${tones[tone]}`}
      >
        {badge}
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl text-balance">
          {title}
        </h1>
        {description ? (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed font-light lg:text-right lg:pb-1 text-pretty">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
