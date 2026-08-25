'use client';

import { useTransition } from 'react';
import { toggleProjectPublish } from '@/actions/github-sync';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface ToggleProjectPublishButtonProps {
  id: string;
  published: boolean;
  title: string;
}

export function ToggleProjectPublishButton({
  id,
  published,
  title,
}: ToggleProjectPublishButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const res = await toggleProjectPublish(id, published);
      if (!res.success) {
        alert(res.message || 'Erro ao alterar visibilidade.');
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      title={published ? `Ocultar "${title}" da vitrine pública` : `Exibir "${title}" na vitrine pública`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer disabled:opacity-50 ${
        published
          ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
          : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700'
      }`}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : published ? (
        <>
          <Eye className="w-3.5 h-3.5" />
          <span>Visível</span>
        </>
      ) : (
        <>
          <EyeOff className="w-3.5 h-3.5" />
          <span>Oculto</span>
        </>
      )}
    </button>
  );
}
