'use client';

import { useActionState, useState } from 'react';
import { upsertProfile, type ProfileActionState } from '@/actions/profile';
import { User, CheckCircle2, AlertCircle, Loader2, Save, Image as ImageIcon } from 'lucide-react';

interface ProfileFormProps {
  initialData?: {
    name: string;
    bio: string;
    avatar: string | null;
    email: string | null;
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
  } | null;
}

const initialState: ProfileActionState = {};

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(upsertProfile, initialState);
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatar || '');

  return (
    <div className="bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Editar Dados do Perfil
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light">
            Atualize seu nome, biografia, foto de exibição e links sociais do Hub.
          </p>
        </div>
      </div>

      {state.success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">{state.message}</p>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
              As alterações já estão visíveis na página inicial do Hub.
            </p>
          </div>
        </div>
      )}

      {state.success === false && state.message && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">{state.message}</p>
            {state.errors?._form && (
              <p className="text-xs text-rose-600/80 dark:text-rose-400/80 mt-0.5">
                {state.errors._form.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Nome */}
        <div className="space-y-2">
          <label htmlFor="profile-name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Nome Completo / Título <span className="text-rose-500">*</span>
          </label>
          <input
            id="profile-name"
            name="name"
            type="text"
            required
            defaultValue={initialData?.name || ''}
            disabled={isPending}
            placeholder="Ex: Marcio Silva | Desenvolvedor Full Stack"
            className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          {state.errors?.name && (
            <p className="text-xs text-rose-500 mt-1">{state.errors.name[0]}</p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label htmlFor="profile-bio" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Biografia Curta <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="profile-bio"
            name="bio"
            rows={3}
            required
            defaultValue={initialData?.bio || ''}
            disabled={isPending}
            placeholder="Descreva brevemente suas competências e foco de atuação..."
            className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-light"
          />
          {state.errors?.bio && (
            <p className="text-xs text-rose-500 mt-1">{state.errors.bio[0]}</p>
          )}
        </div>

        {/* Avatar URL */}
        <div className="space-y-2">
          <label htmlFor="profile-avatar" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-neutral-500" />
            URL da Foto de Perfil (Avatar)
          </label>
          <div className="flex gap-4 items-center">
            <input
              id="profile-avatar"
              name="avatar"
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              disabled={isPending}
              placeholder="https://github.com/seu-usuario.png ou link de imagem..."
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {avatarUrl && (
              <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 shrink-0 bg-neutral-100 dark:bg-neutral-950 shadow-sm">
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

        {/* Redes Sociais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* GitHub */}
          <div className="space-y-1.5">
            <label htmlFor="profile-github" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Link do GitHub
            </label>
            <input
              id="profile-github"
              name="github"
              type="url"
              defaultValue={initialData?.github || ''}
              disabled={isPending}
              placeholder="https://github.com/seu-usuario"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-1.5">
            <label htmlFor="profile-linkedin" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Link do LinkedIn
            </label>
            <input
              id="profile-linkedin"
              name="linkedin"
              type="url"
              defaultValue={initialData?.linkedin || ''}
              disabled={isPending}
              placeholder="https://linkedin.com/in/seu-perfil"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="profile-email" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              E-mail de Contato
            </label>
            <input
              id="profile-email"
              name="email"
              type="email"
              defaultValue={initialData?.email || ''}
              disabled={isPending}
              placeholder="seu-email@exemplo.com"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Twitter / X */}
          <div className="space-y-1.5">
            <label htmlFor="profile-twitter" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Twitter / X (Opcional)
            </label>
            <input
              id="profile-twitter"
              name="twitter"
              type="url"
              defaultValue={initialData?.twitter || ''}
              disabled={isPending}
              placeholder="https://x.com/seu-perfil"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Botão de Salvar */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Salvando Perfil...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
