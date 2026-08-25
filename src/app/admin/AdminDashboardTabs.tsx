'use client';

import { useState } from 'react';
import { AdminAnalyticsDashboard } from './AdminAnalyticsDashboard';
import { ProjectsManager } from './ProjectsManager';
import { ProfileForm } from './ProfileForm';
import { QuickLinkForm } from './QuickLinkForm';
import { PostForm } from './PostForm';
import { DeletePostButton, TogglePostButton } from './DeletePostButton';
import { LayoutDashboard, FolderGit2, BookOpen, Link2, User, ExternalLink, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface AdminDashboardTabsProps {
  profile: {
    id: string;
    name: string;
    bio: string;
    avatar: string | null;
    email: string | null;
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
  } | null;
  quickLinks: Array<{
    id: string;
    title: string;
    url: string;
    icon: string | null;
    highlight: boolean;
    order: number;
  }>;
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
}

export function AdminDashboardTabs({
  profile,
  quickLinks,
  projects,
  posts,
}: AdminDashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'posts' | 'links' | 'profile'>('overview');

  return (
    <div className="space-y-8">
      {/* Abas de Navegação Superiores */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 w-fit shadow-sm transition-colors">
        {/* Aba 1: Visão Geral */}
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Visão Geral</span>
        </button>

        {/* Aba 2: Projetos */}
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'projects'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/50'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projetos ({projects.length})</span>
        </button>

        {/* Aba 3: Diário */}
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'posts'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Diário ({posts.length})</span>
        </button>

        {/* Aba 4: Links do Hub */}
        <button
          onClick={() => setActiveTab('links')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'links'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/50'
          }`}
        >
          <Link2 className="w-4 h-4" />
          <span>Links do Hub ({quickLinks.length})</span>
        </button>

        {/* Aba 5: Perfil */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Perfil</span>
        </button>
      </div>

      {/* Conteúdo Aba 1: Visão Geral (Dashboard Analítico) */}
      {activeTab === 'overview' && (
        <AdminAnalyticsDashboard
          projects={projects}
          posts={posts}
          quickLinks={quickLinks}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />
      )}

      {/* Conteúdo Aba 2: Projetos com Modais & Filtros */}
      {activeTab === 'projects' && (
        <div className="animate-in fade-in duration-200">
          <ProjectsManager projects={projects} />
        </div>
      )}

      {/* Conteúdo Aba 3: Diário */}
      {activeTab === 'posts' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <PostForm />

          {/* Listagem de Posts */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  Artigos e Notas
                </h2>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>

            {posts.length === 0 ? (
              <div className="p-8 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 text-center space-y-2">
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Nenhum post publicado no diário ainda.</p>
                <p className="text-neutral-500 text-xs">
                  Utilize o formulário acima para escrever sua primeira nota ou artigo.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-5 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-base">{post.title}</h3>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            post.published
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {post.published ? 'Publicado' : 'Rascunho'}
                        </span>
                      </div>

                      <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed line-clamp-2 font-light">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-mono">
                        <span>Slug: /journal/{post.slug}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800/60 justify-between sm:justify-end">
                      <Link
                        href={`/journal/${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver Post</span>
                      </Link>

                      <TogglePostButton id={post.id} published={post.published} />
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Conteúdo Aba 4: Links do Hub */}
      {activeTab === 'links' && (
        <div className="animate-in fade-in duration-200">
          <QuickLinkForm links={quickLinks} />
        </div>
      )}

      {/* Conteúdo Aba 5: Perfil */}
      {activeTab === 'profile' && (
        <div className="animate-in fade-in duration-200">
          <ProfileForm initialData={profile} />
        </div>
      )}
    </div>
  );
}
