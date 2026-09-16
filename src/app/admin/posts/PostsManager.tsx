'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { PostModal } from './PostModal';
import { DeletePostConfirmModal } from './DeletePostConfirmModal';
import { TogglePostButton } from './TogglePostButton';
import { AdminPagination } from '../shell/AdminPagination';
import {
  PlusCircle,
  Search,
  BookOpen,
  ExternalLink,
  Edit,
  Trash2,
  X,
} from 'lucide-react';

interface PostItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: Date;
}

interface PostsManagerProps {
  posts: PostItem[];
  openCreate?: boolean;
  onCreateOpened?: () => void;
}

export function PostsManager({
  posts,
  openCreate = false,
  onCreateOpened,
}: PostsManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<PostItem | null>(null);
  const [postToDelete, setPostToDelete] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    if (!openCreate) return;
    setIsNewModalOpen(true);
    onCreateOpened?.();
  }, [openCreate, onCreateOpened]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (statusFilter === 'published' && !post.published) return false;
      if (statusFilter === 'draft' && post.published) return false;

      const query = searchTerm.toLowerCase().trim();
      if (!query) return true;

      return (
        post.title.toLowerCase().includes(query) ||
        post.slug.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    });
  }, [posts, statusFilter, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleStatusFilter = (filter: typeof statusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 shadow-sm backdrop-blur-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-violet-500" />
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Gerenciar Diário
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
              {posts.length} total
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-light">
            Crie, edite e publique artigos do diário técnico.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Novo Artigo</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar por título, slug ou conteúdo..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 text-xs focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {[
            { key: 'all', label: 'Todos', count: posts.length },
            { key: 'published', label: 'Publicados', count: posts.filter((p) => p.published).length },
            { key: 'draft', label: 'Rascunhos', count: posts.filter((p) => !p.published).length },
          ].map((filter) => {
            const isSelected = statusFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => handleStatusFilter(filter.key as typeof statusFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {filter.label}{' '}
                <span className="text-[10px] opacity-80 font-mono">({filter.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="p-12 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 text-center space-y-3 max-w-md mx-auto">
          <BookOpen className="w-8 h-8 text-neutral-400 mx-auto" />
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Nenhum artigo encontrado
          </p>
          <p className="text-xs text-neutral-500">
            Crie o primeiro post ou ajuste os filtros de busca.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-neutral-900 dark:text-white text-base">
                    {post.title}
                  </h3>
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
                  <span>/journal/{post.slug}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800/60 justify-between sm:justify-end">
                <Link
                  href={`/journal/${post.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  title="Ver post"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <TogglePostButton id={post.id} published={post.published} />
                <button
                  onClick={() => setPostToEdit(post)}
                  title="Editar artigo"
                  className="p-2 rounded-lg text-neutral-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/10 border border-transparent hover:border-violet-500/20 transition-all cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPostToDelete({ id: post.id, title: post.title })}
                  title="Excluir artigo"
                  className="p-2 rounded-lg text-neutral-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        activeClassName="bg-violet-600 text-white shadow-sm"
      />

      <PostModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />
      <PostModal
        isOpen={Boolean(postToEdit)}
        onClose={() => setPostToEdit(null)}
        postToEdit={postToEdit}
      />
      <DeletePostConfirmModal
        isOpen={Boolean(postToDelete)}
        onClose={() => setPostToDelete(null)}
        post={postToDelete}
      />
    </div>
  );
}
