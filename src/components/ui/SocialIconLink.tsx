import type { ReactNode } from 'react';

interface SocialIconLinkProps {
  href: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function SocialIconLink({
  href,
  title,
  children,
  className = '',
}: SocialIconLinkProps) {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      title={title}
      aria-label={title}
      className={`inline-flex items-center justify-center rounded-2xl border border-border bg-surface text-neutral-600 dark:text-neutral-400 shadow-sm transition-all hover:scale-110 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-foreground ${className}`}
    >
      {children}
    </a>
  );
}
