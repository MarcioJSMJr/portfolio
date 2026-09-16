'use client';

import { useTransition, useState } from 'react';
import { syncGitHubProjects, type SyncResult } from '@/actions/github-sync';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export function SyncGithubButton() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SyncResult | null>(null);

  const handleSync = () => {
    setResult(null);
    startTransition(async () => {
      const res = await syncGitHubProjects();
      setResult(res);
      setTimeout(() => {
        setResult(null);
      }, 5000);
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={handleSync}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-medium text-xs sm:text-sm border border-neutral-700 dark:border-neutral-600 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin text-cyan-400' : 'text-neutral-300'}`} />
          <span>{isPending ? 'Sincronizando com GitHub...' : 'Sincronizar com GitHub'}</span>
        </button>
      </div>

      {result && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1 ${
            result.success
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400'
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{result.message}</span>
        </div>
      )}
    </div>
  );
}
