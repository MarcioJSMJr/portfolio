'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderGit2, BookOpen, Home } from 'lucide-react';
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
      <Container className="relative h-[4.75rem] flex items-center">
        {/* Logo — esquerda */}
        <Link
          href="/"
          className="relative z-10 flex items-center shrink-0 min-w-0"
          aria-label="Marcio Tech — início"
        >
          <Image
            src="/brand/marcio-tech-logo.png"
            alt="Marcio Tech"
            width={280}
            height={89}
            priority
            className="h-11 sm:h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Menu — centro absoluto da barra */}
        <nav
          aria-label="Principal"
          className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:flex items-center rounded-2xl border border-border/80 bg-neutral-100/80 p-1 dark:bg-white/[0.04]"
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

        {/* Ações — direita */}
        <div className="relative z-10 ml-auto flex items-center gap-2 sm:gap-3">
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
