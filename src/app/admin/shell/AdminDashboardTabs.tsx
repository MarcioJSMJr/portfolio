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
  const [projectCreateSignal, setProjectCreateSignal] = useState(0);
  const [postCreateSignal, setPostCreateSignal] = useState(0);
  const [linkCreateSignal, setLinkCreateSignal] = useState(0);

  const tabs: Array<{
    id: AdminTab;
    label: string;
    icon: typeof LayoutDashboard;
    count?: number;
    activeClass: string;
  }> = [
    {
      id: 'overview',
      label: 'Visão Geral',
      icon: LayoutDashboard,
      activeClass: 'bg-blue-600 text-white shadow-md shadow-blue-500/20',
    },
    {
      id: 'projects',
      label: 'Projetos',
      icon: FolderGit2,
      count: projects.length,
      activeClass: 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20',
    },
    {
      id: 'posts',
      label: 'Diário',
      icon: BookOpen,
      count: posts.length,
      activeClass: 'bg-violet-600 text-white shadow-md shadow-violet-500/20',
    },
    {
      id: 'links',
      label: 'Links do Hub',
      icon: Link2,
      count: quickLinks.length,
      activeClass: 'bg-sky-600 text-white shadow-md shadow-sky-500/20',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 w-fit shadow-sm backdrop-blur-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? tab.activeClass
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>
                  {tab.label}
                  {typeof tab.count === 'number' ? ` (${tab.count})` : ''}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-500/20 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-sm"
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
          onNavigateTab={(tab) => setActiveTab(tab)}
          onOpenNewProject={() => {
            setActiveTab('projects');
            setProjectCreateSignal((n) => n + 1);
          }}
          onOpenNewPost={() => {
            setActiveTab('posts');
            setPostCreateSignal((n) => n + 1);
          }}
          onOpenNewLink={() => {
            setActiveTab('links');
            setLinkCreateSignal((n) => n + 1);
          }}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />
      )}

      {activeTab === 'projects' && (
        <div className="animate-in fade-in duration-200">
          <ProjectsManager
            projects={projects}
            requestOpenCreate={projectCreateSignal}
          />
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="animate-in fade-in duration-200">
          <PostsManager posts={posts} requestOpenCreate={postCreateSignal} />
        </div>
      )}

      {activeTab === 'links' && (
        <div className="animate-in fade-in duration-200">
          <LinksManager links={quickLinks} requestOpenCreate={linkCreateSignal} />
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
