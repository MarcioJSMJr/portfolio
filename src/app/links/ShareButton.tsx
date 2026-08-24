'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  className?: string;
}

export function ShareButton({ className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Portfólio & Hub | Desenvolvedor Full Stack',
            url: window.location.href,
          });
        } catch {
          // Ignora se o usuário cancelou o compartilhamento
        }
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      title={copied ? 'Link copiado!' : 'Compartilhar página'}
      aria-label="Compartilhar página"
      className={`p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105 flex items-center justify-center ${className}`}
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-500 transition-transform scale-110" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
    </button>
  );
}
