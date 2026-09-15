import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';

const variants = {
  featured:
    'bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-600/20 dark:via-indigo-600/20 dark:to-purple-600/20 hover:from-blue-500/20 hover:via-indigo-500/20 hover:to-purple-500/20 border-blue-500/30 hover:border-blue-500/60 shadow-sm hover:shadow-lg hover:shadow-blue-500/5',
  accent:
    'bg-white dark:bg-neutral-900/70 border-border hover:border-purple-400 dark:hover:border-purple-500/40 hover:bg-neutral-50 dark:hover:bg-neutral-900/90 shadow-sm',
  default:
    'bg-white dark:bg-neutral-900/70 border-border hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/90 shadow-sm',
} as const;

const iconWrap = {
  featured:
    'bg-blue-500/15 dark:bg-blue-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400',
  accent:
    'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
  default:
    'bg-neutral-100 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-white',
} as const;

const titleHover = {
  featured: 'group-hover:text-blue-600 dark:group-hover:text-blue-300',
  accent: 'group-hover:text-purple-600 dark:group-hover:text-purple-300',
  default: 'group-hover:text-blue-600 dark:group-hover:text-blue-300',
} as const;

export type HubLinkVariant = keyof typeof variants;

interface HubLinkCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  external?: boolean;
  variant?: HubLinkVariant;
}

export function HubLinkCard({
  href,
  icon,
  title,
  subtitle,
  badge,
  external = false,
  variant = 'default',
}: HubLinkCardProps) {
  const className = `w-full p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 group cursor-pointer hover:scale-[1.01] ${variants[variant]}`;
  const TrailingIcon = external ? ExternalLink : ArrowRight;

  const content = (
    <>
      <div className="flex items-center gap-3.5 text-left min-w-0">
        <div
          className={`p-2.5 rounded-xl border shrink-0 ${iconWrap[variant]}`}
        >
          {icon}
        </div>
        <div className="space-y-0.5 min-w-0">
          <span
            className={`text-sm font-bold text-foreground flex items-center gap-2 flex-wrap ${titleHover[variant]} transition-colors`}
          >
            <span>{title}</span>
            {badge}
          </span>
          {subtitle ? (
            <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
              {subtitle}
            </span>
          ) : null}
        </div>
      </div>
      <TrailingIcon className="w-4 h-4 text-neutral-400 group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
