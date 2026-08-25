'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Calendar, Clock, ArrowRight, X, Newspaper, Sparkles } from 'lucide-react';

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface JournalExplorerProps {
  posts: PostItem[];
  itemsPerPage?: number;
}

export function JournalExplorer({
  posts,
  itemsPerPage = 6,
}: JournalExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filtragem por termo de busca
  const filteredPosts = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return posts;

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.slug.toLowerCase().includes(query)
    );
  }, [posts, searchTerm]);

  // 2. Paginação
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Barra de Pesquisa */}
      <div className="relative max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar no diário por título, conceito ou palavra-chave..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Contador de Resultados */}
      <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
        <span>
          Mostrando{' '}
          <strong className="text-neutral-900 dark:text-white font-semibold">
            {filteredPosts.length}
          </strong>{' '}
          {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        </span>
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Limpar busca</span>
          </button>
        )}
      </div>

      {/* Lista de Artigos */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
            <Newspaper className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Nenhum post encontrado
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light">
              Nenhum artigo corresponde à busca &quot;{searchTerm}&quot;.
            </p>
          </div>
          <button
            onClick={clearSearch}
            className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all cursor-pointer shadow-sm"
          >
            Ver todos os artigos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {currentPosts.map((post) => {
            const words = post.content.split(/\s+/).filter(Boolean).length;
            const readingTime = Math.max(1, Math.ceil(words / 200));

            return (
              <Link
                key={post.id}
                href={`/journal/${post.slug}`}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-400 dark:hover:border-purple-500/40 hover:bg-neutral-50/80 dark:hover:bg-neutral-900/80 transition-all group block shadow-sm hover:shadow-md hover:shadow-purple-500/5 space-y-4"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-mono">
                  <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {readingTime} min de leitura
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3 font-light">
                    {post.content}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300">
                  <span>Ler artigo completo</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="pt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-2 rounded-xl text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
          >
            Anterior
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3.5 py-2 rounded-xl text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}
