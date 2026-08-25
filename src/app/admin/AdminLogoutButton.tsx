'use client';

import { useTransition } from 'react';
import { logoutAdmin } from '@/actions/auth';
import { LogOut, Loader2 } from 'lucide-react';

export function AdminLogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAdmin();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      title="Encerrar sessão"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-500/30 dark:hover:border-rose-500/30 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <LogOut className="w-3.5 h-3.5" />
      )}
      <span>Sair</span>
    </button>
  );
}
