'use client';

import { useState, useMemo } from 'react';
import { Search, FolderGit2, Star, ExternalLink, ChevronLeft, ChevronRight, X, Sparkles, Tag } from 'lucide-react';
import { GithubIcon } from '@/components/icons';

export interface ProjectItem {
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
  updatedAt: Date;
}

interface ProjectsExplorerProps {
  projects: ProjectItem[];
  itemsPerPage?: number;
}

export function ProjectsExplorer({
  projects,
  itemsPerPage = 6,
}: ProjectsExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Todos');
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Extrair todas as tags únicas e contagem
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: projects.length };
    projects.forEach((proj) => {
      proj.tags.forEach((tag) => {
        const normalized = tag.trim();
        if (normalized) {
          counts[normalized] = (counts[normalized] || 0) + 1;
        }
      });
    });
    return counts;
  }, [projects]);

  const uniqueTags = useMemo(() => {
    const tags = Object.keys(tagCounts).filter((t) => t !== 'Todos');
    // Ordenar por frequência (mais populares primeiro)
    tags.sort((a, b) => tagCounts[b] - tagCounts[a]);
    return ['Todos', ...tags];
  }, [tagCounts]);

  // 2. Filtragem dos Projetos
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTag =
        selectedTag === 'Todos' ||
        project.tags.some(
          (t) => t.toLowerCase() === selectedTag.toLowerCase()
        );

      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });
  }, [projects, selectedTag, searchTerm]);

  // 3. Paginação
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const currentProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('Todos');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Controles: Busca & Filtro de Tags */}
      <div className="space-y-5">
        {/* Barra de Pesquisa */}
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar por título, tecnologia ou descrição..."
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtros de Tecnologias / Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0 text-xs text-neutral-500 mr-1 font-mono">
            <Tag className="w-3.5 h-3.5" />
            <span>Stack:</span>
          </div>

          {uniqueTags.map((tag) => {
            const isSelected = selectedTag === tag;
            const count = tagCounts[tag];

            return (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <span>{tag}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contador de Resultados */}
      <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
        <span>
          Mostrando{' '}
          <strong className="text-neutral-900 dark:text-white font-semibold">
            {filteredProjects.length}
          </strong>{' '}
          {filteredProjects.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
        </span>
        {(searchTerm || selectedTag !== 'Todos') && (
          <button
            onClick={clearFilters}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Limpar filtros</span>
          </button>
        )}
      </div>

      {/* Grid de Projetos */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Nenhum projeto encontrado
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Nenhum resultado corresponde à busca &quot;{searchTerm || selectedTag}&quot;.
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all cursor-pointer shadow-sm"
          >
            Ver todos os projetos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between group overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/5 backdrop-blur-sm"
            >
              <div>
                {/* Capa do Projeto */}
                {project.imageUrl ? (
                  <div className="w-full h-44 overflow-hidden bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800/60 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none" />
                  </div>
                ) : (
                  <div className="w-full h-24 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 border-b border-neutral-200 dark:border-neutral-800/60 flex items-center justify-between px-5">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-2">
                      {(project.stars ?? 0) > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{project.stars}</span>
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-neutral-500">
                        {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Conteúdo do Card */}
                <div className="p-5 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors tracking-tight line-clamp-1">
                        {project.title}
                      </h3>
                      {project.imageUrl && (project.stars ?? 0) > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{project.stars}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed line-clamp-2 font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        onClick={() => handleTagChange(tag)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/90 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/70 font-mono tracking-tight cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-neutral-400 font-mono self-center">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Ações / Links do Projeto */}
              <div className="p-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-3 mt-auto">
                <div className="flex items-center gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-medium text-blue-600 dark:text-blue-400 border border-neutral-200 dark:border-neutral-700/50 transition-all hover:scale-105"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Repo</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 transition-all hover:scale-105"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live</span>
                    </a>
                  )}
                </div>

                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                  {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="pt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-sm'
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
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
          >
            <span>Próximo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
