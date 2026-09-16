'use client';

import { useActionState, useEffect, useState } from 'react';
import { upsertProfile, type ProfileActionState } from '@/actions/profile';
import {
  X,
  User,
  Loader2,
  Save,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';

interface ProfileData {
  name: string;
  bio: string;
  avatar: string | null;
  email: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ProfileData | null;
}

const initialState: ProfileActionState = {};

export function ProfileModal({ isOpen, onClose, initialData }: ProfileModalProps) {
  const [state, formAction, isPending] = useActionState(upsertProfile, initialState);
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatar || '');

  useEffect(() => {
    if (isOpen) {
      setAvatarUrl(initialData?.avatar || '');
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => onClose(), 1200);
      return () => clearTimeout(timer);
    }
  }, [state.success, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                Editar Perfil
              </h2>
              <p className="text-xs text-neutral-500 font-light">
                Nome, bio, avatar e redes sociais do Hub.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pt-4">
          {state.success && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5 text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}
          {state.success === false && state.message && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center gap-2.5 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}
        </div>

        <form action={formAction} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="profile-modal-name" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Nome / Título <span className="text-rose-500">*</span>
            </label>
            <input
              id="profile-modal-name"
              name="name"
              type="text"
              required
              defaultValue={initialData?.name || ''}
              disabled={isPending}
              placeholder="Ex: Marcio Silva | Desenvolvedor Full Stack"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
            {state.errors?.name && (
              <p className="text-xs text-rose-500">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="profile-modal-bio" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Biografia <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="profile-modal-bio"
              name="bio"
              rows={3}
              required
              defaultValue={initialData?.bio || ''}
              disabled={isPending}
              placeholder="Descreva brevemente suas competências..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none font-light"
            />
            {state.errors?.bio && (
              <p className="text-xs text-rose-500">{state.errors.bio[0]}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="profile-modal-avatar" className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
              URL do Avatar
            </label>
            <div className="flex gap-3 items-center">
              <input
                id="profile-modal-avatar"
                name="avatar"
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                disabled={isPending}
                placeholder="https://github.com/seu-usuario.png"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
              {avatarUrl && (
                <div className="w-11 h-11 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 shrink-0 bg-neutral-100 dark:bg-neutral-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarUrl}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="profile-modal-github" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                GitHub
              </label>
              <input
                id="profile-modal-github"
                name="github"
                type="url"
                defaultValue={initialData?.github || ''}
                disabled={isPending}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="profile-modal-linkedin" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                LinkedIn
              </label>
              <input
                id="profile-modal-linkedin"
                name="linkedin"
                type="url"
                defaultValue={initialData?.linkedin || ''}
                disabled={isPending}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="profile-modal-email" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                E-mail
              </label>
              <input
                id="profile-modal-email"
                name="email"
                type="email"
                defaultValue={initialData?.email || ''}
                disabled={isPending}
                placeholder="seu-email@exemplo.com"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="profile-modal-twitter" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Twitter / X
              </label>
              <input
                id="profile-modal-twitter"
                name="twitter"
                type="url"
                defaultValue={initialData?.twitter || ''}
                disabled={isPending}
                placeholder="https://x.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar Perfil</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
