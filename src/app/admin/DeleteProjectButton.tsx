'use client';

import { useTransition } from 'react';
import { deleteProject } from '@/actions/projects';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteProjectButtonProps {
  id: string;
  title: string;
}

export function DeleteProjectButton({ id, title }: DeleteProjectButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir o projeto "${title}"?`)) {
      startTransition(async () => {
        const result = await deleteProject(id);
        if (!result.success) {
          alert(result.message || 'Erro ao excluir projeto.');
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Excluir projeto"
      className="p-2 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all disabled:opacity-50 cursor-pointer"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
