import { ExternalLink, FolderGit2, Star } from 'lucide-react';
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

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projetos" className="py-12 relative">
      <div className="space-y-12">
        {/* Listagem de Projetos ou Estado Vazio */}
        {projects.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 text-center space-y-4 max-w-xl mx-auto transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center mx-auto shadow-inner">
              <FolderGit2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Nenhum projeto exibido no momento</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Novos projetos e repositórios sincronizados serão exibidos aqui em breve.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between group overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/5 backdrop-blur-sm"
              >
                <div>
                  {/* Capa do Projeto */}
                  {project.imageUrl ? (
                    <div className="w-full h-52 sm:h-60 overflow-hidden bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800/60 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="w-full h-28 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 border-b border-neutral-200 dark:border-neutral-800/60 flex items-center justify-between px-6">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                        <FolderGit2 className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        {(project.stars ?? 0) > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{project.stars}</span>
                          </span>
                        )}
                        <span className="text-xs font-mono text-neutral-500">
                          {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Conteúdo do Card */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors tracking-tight">
                          {project.title}
                        </h3>
                        {project.imageUrl && (project.stars ?? 0) > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{project.stars}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3 font-light">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/70 font-mono tracking-tight"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ações / Links do Projeto */}
                <div className="p-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-3">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-medium text-blue-600 dark:text-blue-400 border border-neutral-200 dark:border-neutral-700/50 transition-all hover:scale-105"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Código</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 transition-all hover:scale-105"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver Online</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                    {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
