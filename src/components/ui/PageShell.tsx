import type { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  className?: string;
  accent?: 'blue' | 'purple';
}

export function PageShell({
  children,
  className = '',
  accent = 'blue',
}: PageShellProps) {
  const selection =
    accent === 'purple'
      ? 'selection:bg-purple-500/30'
      : 'selection:bg-blue-500/30';

  return (
    <div
      id="top"
      className={`relative min-h-screen flex flex-col bg-background text-foreground ${selection} selection:text-white transition-colors duration-200 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="page-grid absolute inset-0 opacity-[0.4] dark:opacity-[0.25]" />
        <div className="absolute top-8 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/12 via-indigo-600/10 to-purple-600/12 blur-3xl dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-purple-600/20" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl dark:bg-purple-600/15" />
      </div>
      {children}
    </div>
  );
}
