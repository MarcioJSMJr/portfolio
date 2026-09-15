import { FolderGit2, BookOpen } from 'lucide-react';

interface HubProfileProps {
  name: string;
  bio: string;
  avatar?: string | null;
  projectsCount: number;
  postsCount: number;
}

function getMonogram(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'DV';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function HubProfile({
  name,
  bio,
  avatar,
  projectsCount,
  postsCount,
}: HubProfileProps) {
  return (
    <div className="space-y-5 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
          Disponível para projetos
        </span>
      </div>

      <div className="relative group">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 p-[3px] shadow-xl shadow-indigo-500/20 dark:shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={name}
              className="w-full h-full rounded-full object-cover bg-neutral-100 dark:bg-neutral-900"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-300 dark:via-indigo-200 dark:to-purple-300 bg-clip-text text-transparent">
                {getMonogram(name)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
          Olá, eu sou
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          {name}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed font-light">
          {bio}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-neutral-500">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300">
          <FolderGit2 className="w-3.5 h-3.5" />
          {projectsCount} {projectsCount === 1 ? 'projeto' : 'projetos'}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300">
          <BookOpen className="w-3.5 h-3.5" />
          {postsCount} {postsCount === 1 ? 'post' : 'posts'}
        </span>
      </div>
    </div>
  );
}
