'use client';

import { useMemo } from 'react';
import {
  FolderGit2,
  BookOpen,
  Link2,
  Star,
  Eye,
  EyeOff,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  Calendar,
} from 'lucide-react';
import { GithubIcon } from '@/components/icons';

interface AdminAnalyticsDashboardProps {
  projects: Array<{
    id: string;
    githubId?: number | null;
    title: string;
    description: string;
    tags: string[];
    repoUrl: string | null;
    liveUrl: string | null;
    imageUrl: string | null;
    stars?: number;
    isCustom?: boolean;
    published?: boolean;
    createdAt: Date;
  }>;
  posts: Array<{
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    createdAt: Date;
  }>;
  quickLinks: Array<{
    id: string;
    title: string;
    url: string;
    icon: string | null;
    highlight: boolean;
    order: number;
  }>;
  onNavigateTab: (tab: 'projects' | 'posts' | 'links' | 'profile') => void;
  onOpenNewProjectModal?: () => void;
}

export function AdminAnalyticsDashboard({
  projects,
  posts,
  quickLinks,
  onNavigateTab,
  onOpenNewProjectModal,
}: AdminAnalyticsDashboardProps) {
  // 1. Cálculos de Projetos
  const totalProjects = projects.length;
  const visibleProjects = projects.filter((p) => p.published !== false).length;
  const hiddenProjects = totalProjects - visibleProjects;
  const totalStars = projects.reduce((acc, p) => acc + (p.stars || 0), 0);
  const githubProjects = projects.filter((p) => !p.isCustom).length;
  const customProjects = projects.filter((p) => p.isCustom).length;

  // 2. Cálculos de Posts
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.published).length;
  const draftPosts = totalPosts - publishedPosts;

  // 3. Distribuição de Tecnologias / Tags
  const techDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    let totalTagsCount = 0;

    projects.forEach((proj) => {
      proj.tags.forEach((t) => {
        const tag = t.trim();
        if (tag) {
          counts[tag] = (counts[tag] || 0) + 1;
          totalTagsCount++;
        }
      });
    });

    const sorted = Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalTagsCount > 0 ? Math.round((count / totalTagsCount) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // top 8 tecnologias

    return sorted;
  }, [projects]);

  // 4. Feed de Atividades Recentes
  const recentActivities = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      type: 'project' | 'post';
      date: Date;
      status: string;
    }> = [];

    projects.slice(0, 4).forEach((p) => {
      items.push({
        id: p.id,
        title: p.title,
        type: 'project',
        date: new Date(p.createdAt),
        status: p.published !== false ? 'Visível' : 'Oculto',
      });
    });

    posts.slice(0, 3).forEach((p) => {
      items.push({
        id: p.id,
        title: p.title,
        type: 'post',
        date: new Date(p.createdAt),
        status: p.published ? 'Publicado' : 'Rascunho',
      });
    });

    return items.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  }, [projects, posts]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Grade de Cards de KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI: Projetos */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 hover:border-indigo-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Projetos</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {totalProjects}
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs text-neutral-500 font-mono">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Eye className="w-3 h-3" /> {visibleProjects} visíveis
              </span>
              {hiddenProjects > 0 && (
                <span className="text-neutral-400 flex items-center gap-1">
                  <EyeOff className="w-3 h-3" /> {hiddenProjects} ocultos
                </span>
              )}
            </div>
          </div>
        </div>

        {/* KPI: Diário */}
        <div
          onClick={() => onNavigateTab('posts')}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Artigos no Diário</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {totalPosts}
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs text-neutral-500 font-mono">
              <span className="text-emerald-600 dark:text-emerald-400">
                {publishedPosts} publicados
              </span>
              {draftPosts > 0 && (
                <span className="text-amber-500">{draftPosts} rascunhos</span>
              )}
            </div>
          </div>
        </div>

        {/* KPI: Links do Hub */}
        <div
          onClick={() => onNavigateTab('links')}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Links no Hub</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <Link2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {quickLinks.length}
            </div>
            <div className="mt-2 text-xs text-neutral-500 font-mono">
              {quickLinks.filter((l) => l.highlight).length} botões em destaque
            </div>
          </div>
        </div>

        {/* KPI: Estrelas no GitHub */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Estrelas no GitHub</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>{totalStars}</span>
              <span className="text-xs font-mono font-normal text-amber-500">⭐ total</span>
            </div>
            <div className="mt-2 text-xs text-neutral-500 font-mono">
              {githubProjects} repositórios sincronizados
            </div>
          </div>
        </div>
      </div>

      {/* 2. Gráficos & Distribuição de Tecnologias */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribuição de Stack / Tecnologias */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-500" />
                <span>Distribuição de Tecnologias & Stacks</span>
              </h3>
              <p className="text-xs text-neutral-500 font-light">
                Frequência das principais linguagens e frameworks nos seus projetos.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
              Top {techDistribution.length}
            </span>
          </div>

          {techDistribution.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500">
              Nenhuma tecnologia identificada ainda. Cadastre ou sincronize projetos.
            </div>
          ) : (
            <div className="space-y-3.5">
              {techDistribution.map((item, idx) => {
                const colors = [
                  'bg-blue-500',
                  'bg-indigo-500',
                  'bg-purple-500',
                  'bg-cyan-500',
                  'bg-emerald-500',
                  'bg-amber-500',
                  'bg-rose-500',
                  'bg-teal-500',
                ];
                const color = colors[idx % colors.length];

                return (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {item.name}
                      </span>
                      <span className="font-mono text-neutral-500">
                        {item.count} {item.count === 1 ? 'projeto' : 'projetos'} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className={`h-full ${color} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.max(5, item.percentage)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Atividades Recentes & Atalhos */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span>Atividades Recentes</span>
              </h3>
              <p className="text-xs text-neutral-500 font-light">
                Últimos registros cadastrados no sistema.
              </p>
            </div>

            {recentActivities.length === 0 ? (
              <div className="py-6 text-center text-xs text-neutral-500">
                Nenhuma atividade recente registrada.
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {act.type === 'project' ? (
                        <FolderGit2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      )}
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
                        {act.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 shrink-0">
                      {act.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Atalhos Rápidos */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
            <span className="text-[11px] font-mono text-neutral-500 block uppercase tracking-wider">
              Ações Rápidas
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onNavigateTab('projects');
                  onOpenNewProjectModal?.();
                }}
                className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-medium text-xs border border-indigo-200 dark:border-indigo-500/30 transition-all cursor-pointer text-center"
              >
                + Novo Projeto
              </button>
              <button
                onClick={() => onNavigateTab('posts')}
                className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-medium text-xs border border-purple-200 dark:border-purple-500/30 transition-all cursor-pointer text-center"
              >
                + Novo Artigo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
