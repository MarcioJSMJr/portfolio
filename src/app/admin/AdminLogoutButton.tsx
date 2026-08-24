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
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-rose-400 hover:border-rose-500/30 transition-all cursor-pointer disabled:opacity-50"
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
