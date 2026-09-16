'use client';

import { useEffect, useMemo, useState } from 'react';
import { LinkModal } from './LinkModal';
import { DeleteLinkConfirmModal } from './DeleteLinkConfirmModal';
import { AdminPagination } from '../shell/AdminPagination';
import {
  PlusCircle,
  Search,
  Link2,
  Globe,
  Edit,
  Trash2,
  ExternalLink,
  X,
} from 'lucide-react';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string | null;
  highlight: boolean;
  order: number;
}

interface LinksManagerProps {
  links: LinkItem[];
  openCreate?: boolean;
  onCreateOpened?: () => void;
}

export function LinksManager({
  links,
  openCreate = false,
  onCreateOpened,
}: LinksManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);
  const [linkToDelete, setLinkToDelete] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    if (!openCreate) return;
    setIsNewModalOpen(true);
    onCreateOpened?.();
  }, [openCreate, onCreateOpened]);

  const filteredLinks = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return links;
    return links.filter(
      (link) =>
        link.title.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query)
    );
  }, [links, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredLinks.length / itemsPerPage));
  const currentLinks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLinks.slice(start, start + itemsPerPage);
  }, [filteredLinks, currentPage, itemsPerPage]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 shadow-sm backdrop-blur-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <Link2 className="w-5 h-5 text-sky-500" />
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Links do Hub
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
              {links.length} total
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-light">
            Gerencie os botões extras da página inicial estilo Linktree.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Novo Link</span>
        </button>
      </div>

      <div className="relative w-full md:max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar por título ou URL..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-sm"
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

      {filteredLinks.length === 0 ? (
        <div className="p-12 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 text-center space-y-3 max-w-md mx-auto">
          <Link2 className="w-8 h-8 text-neutral-400 mx-auto" />
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Nenhum link cadastrado
          </p>
          <p className="text-xs text-neutral-500">
            O Hub já tem os atalhos padrão. Adicione botões extras aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {currentLinks.map((link) => (
            <div
              key={link.id}
              className="p-4 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 flex items-center justify-between gap-4 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                      {link.title}
                    </span>
                    {link.highlight && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300 font-mono font-semibold">
                        Destaque
                      </span>
                    )}
                    <span className="text-[10px] text-neutral-500 font-mono">
                      #{link.order}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block truncate max-w-sm">
                    {link.url}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  title="Abrir link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setLinkToEdit(link)}
                  title="Editar link"
                  className="p-2 rounded-lg text-neutral-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-500/10 border border-transparent hover:border-sky-500/20 transition-all cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setLinkToDelete({ id: link.id, title: link.title })}
                  title="Excluir link"
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
        activeClassName="bg-sky-600 text-white shadow-sm"
      />

      <LinkModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        defaultOrder={links.length}
      />
      <LinkModal
        isOpen={Boolean(linkToEdit)}
        onClose={() => setLinkToEdit(null)}
        linkToEdit={linkToEdit}
      />
      <DeleteLinkConfirmModal
        isOpen={Boolean(linkToDelete)}
        onClose={() => setLinkToDelete(null)}
        link={linkToDelete}
      />
    </div>
  );
}
