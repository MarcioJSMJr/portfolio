'use client';

import { useTransition } from 'react';
import { deletePost, togglePostPublish } from '@/actions/posts';
import { Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';

interface DeletePostButtonProps {
  id: string;
  title: string;
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir o post "${title}"?`)) {
      startTransition(async () => {
        const result = await deletePost(id);
        if (!result.success) {
          alert(result.message || 'Erro ao excluir post.');
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Excluir post"
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

interface TogglePostButtonProps {
  id: string;
  published: boolean;
}

export function TogglePostButton({ id, published }: TogglePostButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await togglePostPublish(id, published);
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      title={published ? 'Despublicar post' : 'Publicar post'}
      className={`p-2 rounded-lg border transition-all disabled:opacity-50 cursor-pointer ${
        published
          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20'
          : 'text-neutral-400 bg-neutral-800/60 border-neutral-700/60 hover:bg-neutral-800 hover:text-white'
      }`}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : published ? (
        <Eye className="w-4 h-4" />
      ) : (
        <EyeOff className="w-4 h-4" />
      )}
    </button>
  );
}
