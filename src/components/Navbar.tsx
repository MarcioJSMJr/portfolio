import Link from 'next/link';
import { Sparkles, FolderGit2, BookOpen, Home } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800/80 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Nome */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-tight text-neutral-900 dark:text-white hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
            Portfólio<span className="text-blue-500">.dev</span>
          </span>
        </Link>

        {/* Links de navegação e Alternador de Tema */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <Link
              href="/"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hub</span>
            </Link>
            <Link
              href="/projects"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Projetos</span>
            </Link>
            <Link
              href="/journal"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-500" />
              <span>Diário</span>
            </Link>
          </nav>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
