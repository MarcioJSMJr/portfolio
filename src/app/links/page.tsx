import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ShareButton } from './ShareButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { GithubIcon, LinkedInIcon, WhatsAppIcon, MailIcon } from '@/components/icons';
import { Globe, BookOpen, ArrowRight, ExternalLink, Code2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Links Rápidos | Desenvolvedor Full Stack',
  description: 'Conecte-se comigo através dos meus links sociais, portfólio e diário técnico.',
};

export default async function LinksPage() {
  const [profile, customLinks] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 'me' } }).catch(() => null),
    prisma.quickLink.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  const name = profile?.name || 'Desenvolvedor Full Stack';
  const bio =
    profile?.bio ||
    'Next.js, React, TypeScript, Tailwind CSS e PostgreSQL no Supabase.';
  const avatar = profile?.avatar;

  const defaultLinks = [
    {
      title: 'Showcase de Projetos & Portfólio',
      subtitle: 'Conheça meus projetos, stack e experiências',
      url: '/projects',
      icon: Globe,
      isInternal: true,
      highlight: true,
    },
    {
      title: 'Diário de Estudos & Artigos',
      subtitle: 'Anotações diárias sobre desenvolvimento e arquitetura',
      url: '/journal',
      icon: BookOpen,
      isInternal: true,
      highlight: false,
    },
    ...(profile?.github
      ? [
          {
            title: 'GitHub',
            subtitle: 'Repositórios e contribuições de código',
            url: profile.github,
            icon: GithubIcon,
            isInternal: false,
            highlight: false,
          },
        ]
      : []),
    ...(profile?.linkedin
      ? [
          {
            title: 'LinkedIn',
            subtitle: 'Trajetória profissional e networking',
            url: profile.linkedin,
            icon: LinkedInIcon,
            isInternal: false,
            highlight: false,
          },
        ]
      : []),
    ...(profile?.email
      ? [
          {
            title: 'E-mail de Contato',
            subtitle: profile.email,
            url: `mailto:${profile.email}`,
            icon: MailIcon,
            isInternal: false,
            highlight: false,
          },
        ]
      : []),
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col items-center justify-between p-4 sm:p-6 relative selection:bg-blue-500/30 transition-colors duration-200">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Botões de Ação no topo */}
      <div className="w-full max-w-md flex items-center justify-between pt-4 pb-2">
        <Link
          href="/"
          className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors flex items-center gap-1 font-mono"
        >
          <span>← Hub Principal</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ShareButton />
        </div>
      </div>

      {/* Container Principal */}
      <div className="w-full max-w-md my-auto py-8 space-y-8 text-center">
        {/* Avatar e Perfil */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-500/20">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full rounded-full object-cover bg-neutral-100 dark:bg-neutral-900"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-800 dark:text-white">
                  <Code2 className="w-10 h-10 text-blue-500" />
                </div>
              )}
            </div>
            {/* Status dot */}
            <span className="absolute bottom-1 right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#fafafa] dark:border-neutral-950" />
            </span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
              {name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed font-light">
              {bio}
            </p>
          </div>
        </div>

        {/* Lista Vertical de Links */}
        <div className="space-y-3.5">
          {defaultLinks.map((link) => {
            const Icon = link.icon;
            const linkContent = (
              <div
                className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 group cursor-pointer shadow-sm hover:scale-[1.01] ${
                  link.highlight
                    ? 'bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-600/15 dark:via-indigo-600/15 dark:to-purple-600/15 border-blue-500/30 hover:border-blue-500/60'
                    : 'bg-white dark:bg-neutral-900/70 border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/90'
                }`}
              >
                <div className="flex items-center gap-3.5 text-left">
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 ${
                      link.highlight
                        ? 'bg-blue-500/15 dark:bg-blue-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400'
                        : 'bg-neutral-100 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white block group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                      {link.title}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block line-clamp-1">
                      {link.subtitle}
                    </span>
                  </div>
                </div>

                <div className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all">
                  {link.isInternal ? (
                    <ArrowRight className="w-4 h-4" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                </div>
              </div>
            );

            return link.isInternal ? (
              <Link key={link.title} href={link.url}>
                {linkContent}
              </Link>
            ) : (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkContent}
              </a>
            );
          })}

          {/* Links customizados do banco */}
          {customLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-2xl border bg-white dark:bg-neutral-900/70 border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/90 transition-all flex items-center justify-between gap-4 group shadow-sm hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="p-2.5 rounded-xl border bg-neutral-100 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white block group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  {link.title}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-300" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-md text-center py-4 text-xs text-neutral-400 dark:text-neutral-600 font-mono">
        © {new Date().getFullYear()} • Feito com Next.js & Supabase
      </footer>
    </main>
  );
}
