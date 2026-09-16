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
      className={`relative isolate min-h-screen flex flex-col bg-background text-foreground overflow-x-clip ${selection} selection:text-white transition-colors duration-200`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="page-grid absolute inset-0 opacity-80 dark:opacity-60" />
        <div className="absolute top-0 left-1/2 h-[32rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/25 via-indigo-600/20 to-purple-600/25 blur-3xl dark:from-blue-500/35 dark:via-indigo-500/25 dark:to-purple-500/32" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl dark:bg-purple-500/28" />
      </div>
      <div className={`relative z-10 flex min-h-screen flex-col ${className}`}>
        {children}
      </div>
    </div>
  );
}
