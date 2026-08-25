import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';
import { AdminLoginForm } from './AdminLoginForm';
import { AdminLogoutButton } from './AdminLogoutButton';
import { AdminDashboardTabs } from './AdminDashboardTabs';
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
    <main className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-4 py-8 sm:px-8 md:px-16 lg:px-24 selection:bg-blue-500/30 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Barra superior de navegação */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800/80">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar ao Hub Principal</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              Sessão Ativa
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Database className="w-3 h-3" />
              Supabase
            </span>
            <AdminLogoutButton />
            <ThemeToggle />
          </div>
        </div>

        {/* Cabeçalho do Painel */}
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Painel Administrativo
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base font-light">
            Gerencie seu perfil, os botões do Hub inicial, os projetos e o diário técnico.
          </p>
        </header>

        {/* Dashboard com Abas */}
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
