'use client';

import { useTransition } from 'react';
import { deleteProject } from '@/actions/projects';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteProjectConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: { id: string; title: string } | null;
}

export function DeleteProjectConfirmModal({
  isOpen,
  onClose,
  project,
}: DeleteProjectConfirmModalProps) {
  const [isPending, startTransition] = useTransition();

  if (!isOpen || !project) return null;

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteProject(project.id || project.title);
      if (res.success) {
        onClose();
      } else {
        alert(res.message || 'Erro ao excluir projeto.');
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Excluir Projeto
            </h3>
            <p className="text-xs text-neutral-500">
              Esta ação removerá o projeto permanentemente do banco de dados.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
          <span className="text-xs text-neutral-400 font-mono">Projeto selecionado:</span>
          <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
            {project.title}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-md shadow-rose-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Excluindo...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Sim, Excluir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
