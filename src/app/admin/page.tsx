import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';
import { AdminLoginForm } from './shell/AdminLoginForm';
import { AdminLogoutButton } from './shell/AdminLogoutButton';
import { AdminDashboardTabs } from './shell/AdminDashboardTabs';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowLeft, Database, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Painel Administrativo | Portfólio',
  description: 'Gerenciamento de perfil, links, projetos e diário pessoal.',
};

export default async function AdminPage() {
  const isAuth = await isAdminAuthenticated();

  if (!isAuth) {
    return <AdminLoginForm />;
  }

  const [profile, quickLinks, projects, posts] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 'me' } }).catch(() => null),
    prisma.quickLink.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.post.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
  ]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f7f8fa] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-4 py-6 sm:px-8 sm:py-8 lg:px-10 xl:px-12 2xl:px-16 selection:bg-blue-500/30 transition-colors duration-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(20,184,166,0.06),_transparent_45%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(20,184,166,0.08),_transparent_45%)]"
      />

      <div className="mx-auto w-full max-w-none space-y-8 sm:space-y-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between sm:gap-4 pb-5 sm:pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="sm:hidden">Voltar ao Hub</span>
            <span className="hidden sm:inline">Voltar ao Hub Principal</span>
          </Link>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              <span>Sessão Ativa</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Database className="w-3 h-3" />
              Supabase
            </span>
            <AdminLogoutButton />
            <ThemeToggle />
          </div>
        </div>

        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white text-balance">
            Painel Administrativo
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base font-light max-w-2xl text-pretty">
            Visão geral, projetos, diário e links do Hub — perfil e formulários em modais.
          </p>
        </header>

        <AdminDashboardTabs
          profile={profile}
          quickLinks={quickLinks}
          projects={projects}
          posts={posts}
        />
      </div>
    </main>
  );
}
