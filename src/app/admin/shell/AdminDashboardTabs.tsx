'use client';

import { useState } from 'react';
import { AdminAnalyticsDashboard } from './AdminAnalyticsDashboard';
import { ProjectsManager } from '../projects/ProjectsManager';
import { PostsManager } from '../posts/PostsManager';
import { LinksManager } from '../links/LinksManager';
import { ProfileModal } from '../profile/ProfileModal';
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Link2,
  User,
} from 'lucide-react';

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

type AdminTab = 'overview' | 'projects' | 'posts' | 'links';

export function AdminDashboardTabs({
  profile,
  quickLinks,
  projects,
  posts,
}: AdminDashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  /** One-shot: só abre modal de criação quando vem das Ações Rápidas */
  const [pendingCreate, setPendingCreate] = useState<'project' | 'post' | 'link' | null>(null);

  const tabs: Array<{
    id: AdminTab;
    label: string;
    shortLabel: string;
    icon: typeof LayoutDashboard;
    count?: number;
    activeClass: string;
  }> = [
    {
      id: 'overview',
      label: 'Visão Geral',
      shortLabel: 'Geral',
      icon: LayoutDashboard,
      activeClass: 'bg-blue-600 text-white shadow-md shadow-blue-500/20',
    },
    {
      id: 'projects',
      label: 'Projetos',
      shortLabel: 'Projetos',
      icon: FolderGit2,
      count: projects.length,
      activeClass: 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20',
    },
    {
      id: 'posts',
      label: 'Diário',
      shortLabel: 'Diário',
      icon: BookOpen,
      count: posts.length,
      activeClass: 'bg-violet-600 text-white shadow-md shadow-violet-500/20',
    },
    {
      id: 'links',
      label: 'Links do Hub',
      shortLabel: 'Links',
      icon: Link2,
      count: quickLinks.length,
      activeClass: 'bg-sky-600 text-white shadow-md shadow-sky-500/20',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center justify-between">
        <div className="w-full lg:w-auto max-w-full overflow-x-auto scrollbar-none">
          <div className="inline-flex min-w-max items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-sm backdrop-blur-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setPendingCreate(null);
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? tab.activeClass
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">
                    {tab.label}
                    {typeof tab.count === 'number' ? ` (${tab.count})` : ''}
                  </span>
                  {typeof tab.count === 'number' ? (
                    <span className="sm:hidden text-[10px] opacity-80 font-mono">
                      ({tab.count})
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-500/20 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-sm w-full sm:w-auto shrink-0"
        >
          <User className="w-4 h-4" />
          <span>Editar Perfil</span>
        </button>
      </div>

      {activeTab === 'overview' && (
        <AdminAnalyticsDashboard
          projects={projects}
          posts={posts}
          quickLinks={quickLinks}
          onNavigateTab={(tab) => {
            setPendingCreate(null);
            setActiveTab(tab);
          }}
          onOpenNewProject={() => {
            setPendingCreate('project');
            setActiveTab('projects');
          }}
          onOpenNewPost={() => {
            setPendingCreate('post');
            setActiveTab('posts');
          }}
          onOpenNewLink={() => {
            setPendingCreate('link');
            setActiveTab('links');
          }}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />
      )}

      {activeTab === 'projects' && (
        <div className="animate-in fade-in duration-200">
          <ProjectsManager
            projects={projects}
            openCreate={pendingCreate === 'project'}
            onCreateOpened={() => setPendingCreate(null)}
          />
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="animate-in fade-in duration-200">
          <PostsManager
            posts={posts}
            openCreate={pendingCreate === 'post'}
            onCreateOpened={() => setPendingCreate(null)}
          />
        </div>
      )}

      {activeTab === 'links' && (
        <div className="animate-in fade-in duration-200">
          <LinksManager
            links={quickLinks}
            openCreate={pendingCreate === 'link'}
            onCreateOpened={() => setPendingCreate(null)}
          />
        </div>
      )}

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialData={profile}
      />
    </div>
  );
}
