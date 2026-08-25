'use client';

import { useState, useMemo } from 'react';
import { SyncGithubButton } from './SyncGithubButton';
import { ToggleProjectPublishButton } from './ToggleProjectPublishButton';
import { ProjectModal } from './ProjectModal';
import { DeleteProjectConfirmModal } from './DeleteProjectConfirmModal';
import {
  PlusCircle,
  Search,
  FolderGit2,
  Star,
  ExternalLink,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '@/components/icons';

interface ProjectItem {
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
}

interface ProjectsManagerProps {
  projects: ProjectItem[];
}

export function ProjectsManager({ projects }: ProjectsManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState<'all' | 'visible' | 'hidden' | 'github' | 'custom'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modais
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectItem | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; title: string } | null>(null);

  // 1. Filtragem
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Filtro de Categoria/Visibilidade
      if (visibilityFilter === 'visible' && project.published === false) return false;
      if (visibilityFilter === 'hidden' && project.published !== false) return false;
      if (visibilityFilter === 'github' && project.isCustom) return false;
      if (visibilityFilter === 'custom' && !project.isCustom) return false;

      // Filtro de Busca
      const query = searchTerm.toLowerCase().trim();
      if (!query) return true;

      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [projects, visibilityFilter, searchTerm]);

  // 2. Paginação
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const currentProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  const handleFilterChange = (filter: typeof visibilityFilter) => {
    setVisibilityFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Barra de Ações Superiores: Título, Novo Projeto e Sincronização */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Gerenciar Projetos
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
              {projects.length} total
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-light">
            Cadastre novos projetos, sincronize do GitHub e controle o que fica visível na vitrine.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Novo Projeto</span>
          </button>
          <SyncGithubButton />
        </div>
      </div>

      {/* Controles de Busca e Filtro de Visibilidade */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Barra de Busca */}
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar por título, tag ou descrição..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 text-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
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

        {/* Abas de Filtros de Visibilidade */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { key: 'all', label: 'Todos', count: projects.length },
            { key: 'visible', label: 'Visíveis', count: projects.filter((p) => p.published !== false).length },
            { key: 'hidden', label: 'Ocultos', count: projects.filter((p) => p.published === false).length },
            { key: 'github', label: 'GitHub', count: projects.filter((p) => !p.isCustom).length },
            { key: 'custom', label: 'Manuais', count: projects.filter((p) => p.isCustom).length },
          ].map((filter) => {
            const isSelected = visibilityFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key as typeof visibilityFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <span>{filter.label}</span>{' '}
                <span className="text-[10px] opacity-80 font-mono">({filter.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de Cards de Projetos */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 text-center space-y-3 max-w-md mx-auto">
          <FolderGit2 className="w-8 h-8 text-neutral-400 mx-auto" />
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Nenhum projeto encontrado
          </p>
          <p className="text-xs text-neutral-500">
            Nenhum item corresponde ao filtro ou busca selecionada.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              {/* Informações Principais */}
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-neutral-900 dark:text-white text-base">
                    {project.title}
                  </h3>

                  {/* Badge de Origem */}
                  <span
                    className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${
                      project.isCustom
                        ? 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400'
                        : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400'
                    }`}
                  >
                    {project.isCustom ? 'Manual' : 'GitHub'}
                  </span>

                  {/* Estrelas */}
                  {(project.stars ?? 0) > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{project.stars}</span>
                    </span>
                  )}

                  {/* Status de Visibilidade */}
                  <span
                    className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${
                      project.published !== false
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-500'
                    }`}
                  >
                    {project.published !== false ? 'Visível' : 'Oculto'}
                  </span>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed line-clamp-2 font-light">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-0.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ações / Botões */}
              <div className="flex items-center gap-2 sm:self-center shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800/60 justify-between sm:justify-end">
                {/* Links externos */}
                <div className="flex items-center gap-2 text-xs mr-1">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Ver Repositório"
                      className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Ver Online"
                      className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Alternar Visibilidade */}
                <ToggleProjectPublishButton
                  id={project.id}
                  published={project.published !== false}
                  title={project.title}
                />

                {/* Editar */}
                <button
                  onClick={() => setProjectToEdit(project)}
                  title="Editar projeto"
                  className="p-2 rounded-lg text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20 transition-all cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>

                {/* Excluir */}
                <button
                  onClick={() => setProjectToDelete({ id: project.id, title: project.title })}
                  title="Excluir projeto"
                  className="p-2 rounded-lg text-neutral-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="pt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
          >
            Anterior
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white shadow-sm'
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
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
          >
            Próximo
          </button>
        </div>
      )}

      {/* Modais de Criação e Edição */}
      <ProjectModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />

      <ProjectModal
        isOpen={Boolean(projectToEdit)}
        onClose={() => setProjectToEdit(null)}
        projectToEdit={projectToEdit}
      />

      <DeleteProjectConfirmModal
        isOpen={Boolean(projectToDelete)}
        onClose={() => setProjectToDelete(null)}
        project={projectToDelete}
      />
    </div>
  );
}
