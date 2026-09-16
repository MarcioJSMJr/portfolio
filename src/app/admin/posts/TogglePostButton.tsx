'use client';

import { useTransition } from 'react';
import { togglePostPublish } from '@/actions/posts';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

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
          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20'
          : 'text-neutral-500 bg-neutral-100 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700/60 hover:text-neutral-900 dark:hover:text-white'
      }`}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : published ? (
        <Eye className="w-3.5 h-3.5" />
      ) : (
        <EyeOff className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
