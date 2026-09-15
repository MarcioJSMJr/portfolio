'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderGit2, BookOpen, Home, Terminal } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Container } from '@/components/ui';

const links = [
  { href: '/', label: 'Hub', icon: Home, match: (path: string) => path === '/' },
  {
    href: '/projects',
    label: 'Projetos',
    icon: FolderGit2,
    match: (path: string) => path.startsWith('/projects'),
  },
  {
    href: '/journal',
    label: 'Diário',
    icon: BookOpen,
    match: (path: string) => path.startsWith('/journal'),
  },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 border-b border-border/70 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60" />
      <Container className="relative h-[4.25rem] flex items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0 min-w-0"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-500/25 bg-neutral-950 text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:bg-neutral-900">
            <Terminal className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-6" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-sm bg-emerald-400" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              full stack
            </span>
            <span className="text-sm sm:text-base font-semibold tracking-tight text-foreground">
              Portfólio
              <span className="text-cyan-600 dark:text-cyan-400">.dev</span>
            </span>
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="hidden sm:flex items-center rounded-2xl border border-border/80 bg-neutral-100/80 p-1 dark:bg-white/[0.04]"
        >
          {links.map(({ href, label, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all ${
                  active
                    ? 'bg-white text-foreground shadow-sm dark:bg-neutral-800 dark:text-white'
                    : 'text-neutral-500 hover:text-foreground dark:text-neutral-400'
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${
                    active
                      ? href === '/journal'
                        ? 'text-violet-500'
                        : 'text-cyan-600 dark:text-cyan-400'
                      : ''
                  }`}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav
            aria-label="Mobile"
            className="flex sm:hidden items-center gap-1 rounded-2xl border border-border/80 bg-neutral-100/80 p-1 dark:bg-white/[0.04]"
          >
            {links.map(({ href, label, icon: Icon, match }) => {
              const active = match(pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  title={label}
                  aria-label={label}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                    active
                      ? 'bg-white text-foreground shadow-sm dark:bg-neutral-800'
                      : 'text-neutral-500 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
