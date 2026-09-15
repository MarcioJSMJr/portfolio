import { FolderGit2, BookOpen, Globe } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ShareButton } from '@/components/ShareButton';
import { PageShell } from '@/components/ui';
import { HubProfile } from './HubProfile';
import { HubLinkCard } from './HubLinkCard';
import { HubSocials } from './HubSocials';

export interface HubCustomLink {
  id: string;
  title: string;
  url: string;
  highlight: boolean;
}

interface HubPageProps {
  name: string;
  bio: string;
  avatar?: string | null;
  email?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  customLinks: HubCustomLink[];
  projectsCount: number;
  postsCount: number;
}

export function HubPage({
  name,
  bio,
  avatar,
  email,
  github,
  linkedin,
  twitter,
  customLinks,
  projectsCount,
  postsCount,
}: HubPageProps) {
  return (
    <PageShell className="items-center">
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center px-4 py-6 sm:px-6">
        <div className="w-full max-w-xl flex items-center justify-end gap-2 pt-2 pb-4">
          <ThemeToggle />
          <ShareButton />
        </div>

        <div className="my-auto w-full max-w-xl py-4">
          <div className="rounded-3xl border border-border/80 bg-white/70 dark:bg-neutral-900/45 p-6 sm:p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-xl text-center">
            <HubProfile
              name={name}
              bio={bio}
              avatar={avatar}
              projectsCount={projectsCount}
              postsCount={postsCount}
            />

            <div className="mt-8 space-y-3">
              <HubLinkCard
                href="/projects"
                variant="featured"
                icon={<FolderGit2 className="w-5 h-5" />}
                title="Showcase de Projetos"
                subtitle="Aplicações completas, front-end e APIs em produção"
                badge={
                  projectsCount > 0 ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 font-mono font-semibold">
                      {projectsCount} {projectsCount === 1 ? 'projeto' : 'projetos'}
                    </span>
                  ) : null
                }
              />

              <HubLinkCard
                href="/journal"
                variant="accent"
                icon={<BookOpen className="w-5 h-5" />}
                title="Diário de Estudos & Artigos"
                subtitle="Reflexões, aprendizados e anotações diárias"
                badge={
                  postsCount > 0 ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 font-mono font-semibold">
                      {postsCount} {postsCount === 1 ? 'post' : 'posts'}
                    </span>
                  ) : null
                }
              />

              {customLinks.map((link) => (
                <HubLinkCard
                  key={link.id}
                  href={link.url}
                  external
                  variant={link.highlight ? 'featured' : 'default'}
                  icon={<Globe className="w-5 h-5" />}
                  title={link.title}
                />
              ))}
            </div>

            <HubSocials
              github={github}
              linkedin={linkedin}
              email={email}
              twitter={twitter}
            />
          </div>
        </div>

        <footer className="w-full max-w-xl text-center py-5 text-xs text-neutral-400 dark:text-neutral-600 font-mono">
          © {new Date().getFullYear()} • Construído com Next.js & Supabase
        </footer>
      </div>
    </PageShell>
  );
}
