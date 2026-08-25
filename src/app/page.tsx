import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ShareButton } from './links/ShareButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { GithubIcon, LinkedInIcon, WhatsAppIcon, MailIcon } from '@/components/icons';
import { FolderGit2, BookOpen, ExternalLink, ArrowRight, Sparkles, Code2, Globe } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Hub & Portfólio | Desenvolvedor Full Stack',
  description: 'Conheça meus projetos, diário técnico e principais links profissionais.',
};

export default async function Home() {
  const [profile, customLinks, projectsCount, postsCount] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 'me' } }).catch(() => null),
    prisma.quickLink.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.project.count({ where: { published: true } }).catch(() => 0),
    prisma.post.count({ where: { published: true } }).catch(() => 0),
  ]);

  const name = profile?.name || 'Desenvolvedor Full Stack';
  const bio =
    profile?.bio ||
    'Especialista no ecossistema React, Next.js, TypeScript e PostgreSQL no Supabase. Foco em interfaces excepcionais e arquitetura robusta.';
  const avatar = profile?.avatar;
  const email = profile?.email;
  const github = profile?.github;
  const linkedin = profile?.linkedin;
  const twitter = profile?.twitter;

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col items-center justify-between p-4 sm:p-6 relative selection:bg-blue-500/30 transition-colors duration-200">
      {/* Luz ambiente decorativa de fundo */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-600/15 dark:via-indigo-600/15 dark:to-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Barra superior com Status, ThemeToggle e Compartilhar */}
      <div className="w-full max-w-lg flex items-center justify-between pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
            Disponível para projetos
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ShareButton />
        </div>
      </div>

      {/* Container Principal do Hub */}
      <div className="w-full max-w-lg my-auto py-8 space-y-8 text-center">
        {/* Avatar e Informações do Perfil */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 p-1 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
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
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed font-light">
              {bio}
            </p>
          </div>
        </div>

        {/* Lista de Botões de Ação */}
        <div className="space-y-3.5">
          {/* Botão de Destaque: Projetos */}
          <Link
            href="/projects"
            className="w-full p-4.5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-600/20 dark:via-indigo-600/20 dark:to-purple-600/20 hover:from-blue-500/20 hover:via-indigo-500/20 hover:to-purple-500/20 border border-blue-500/30 hover:border-blue-500/60 transition-all flex items-center justify-between gap-4 group cursor-pointer shadow-sm hover:shadow-lg hover:shadow-blue-500/5 hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="p-2.5 rounded-xl bg-blue-500/15 dark:bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 shrink-0">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-neutral-900 dark:text-white block group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors flex items-center gap-2">
                  <span>Showcase de Projetos</span>
                  {projectsCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 font-mono font-semibold">
                      {projectsCount} {projectsCount === 1 ? 'projeto' : 'projetos'}
                    </span>
                  )}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                  Aplicações completas, front-end e APIs em produção
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Botão de Destaque: Diário Técnico */}
          <Link
            href="/journal"
            className="w-full p-4.5 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-400 dark:hover:border-purple-500/40 hover:bg-neutral-50 dark:hover:bg-neutral-900/90 transition-all flex items-center justify-between gap-4 group cursor-pointer shadow-sm hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-neutral-900 dark:text-white block group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors flex items-center gap-2">
                  <span>Diário de Estudos & Artigos</span>
                  {postsCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 font-mono font-semibold">
                      {postsCount} {postsCount === 1 ? 'post' : 'posts'}
                    </span>
                  )}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                  Reflexões, aprendizados e anotações diárias
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Links Dinâmicos Cadastrados */}
          {customLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 group cursor-pointer hover:scale-[1.01] ${
                link.highlight
                  ? 'bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-600/15 dark:via-indigo-600/15 dark:to-purple-600/15 border-blue-500/30 hover:border-blue-500/50 shadow-sm'
                  : 'bg-white dark:bg-neutral-900/70 border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/90 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-white shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white block group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  {link.title}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors" />
            </a>
          ))}
        </div>

        {/* Ícones de Redes Sociais no Rodapé do Hub */}
        <div className="pt-4 flex items-center justify-center gap-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="p-3 rounded-2xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all hover:scale-110 shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="p-3 rounded-2xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-110 shadow-sm"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              title="E-mail"
              className="p-3 rounded-2xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-110 shadow-sm"
            >
              <MailIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Footer minimalista */}
      <footer className="w-full max-w-lg text-center py-4 text-xs text-neutral-400 dark:text-neutral-600 font-mono">
        © {new Date().getFullYear()} • Construído com Next.js & Supabase
      </footer>
    </main>
  );
}