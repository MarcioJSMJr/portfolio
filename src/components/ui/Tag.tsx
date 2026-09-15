import type { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Tag({ children, onClick, className = '' }: TagProps) {
  return (
    <span
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/70 font-mono tracking-tight transition-colors ${
        onClick
          ? 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30'
          : ''
      } ${className}`}
    >
      {children}
    </span>
  );
}
