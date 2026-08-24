'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { createProject, type ActionState } from '@/actions/projects';
import { PlusCircle, Sparkles, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, Globe, Tag } from 'lucide-react';
import { GithubIcon } from '@/components/icons';

const initialState: ActionState = {};

export function ProjectForm() {
  const [state, formAction, isPending] = useActionState(createProject, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const [tagInput, setTagInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setTagInput('');
      setImageUrl('');
    }
  }, [state.success]);

  const parsedTags = tagInput
    ? tagInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    : [];

  return (
    <div className="bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Cadastrar Novo Projeto
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light">
            Preencha as informações para adicionar um novo item ao seu portfólio.
          </p>
        </div>
      </div>

      {state.success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">{state.message}</p>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
              O projeto já está visível na página de Projetos e no banco de dados.
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
              <p className="text-xs text-rose-600/80 dark:text-rose-400/80 mt-0.5">{state.errors._form.join(', ')}</p>
            )}
          </div>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-6">
        {/* Título */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Título do Projeto <span className="text-rose-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Ex: Plataforma SaaS de Gerenciamento"
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none transition-all ${
              state.errors?.title
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                : 'border-neutral-200 dark:border-neutral-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
          {state.errors?.title && (
            <p className="text-xs text-rose-500 mt-1">{state.errors.title[0]}</p>
          )}
        </div>

        {/* Descrição */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Descrição Detalhada <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            placeholder="Descreva o objetivo, as principais funcionalidades e a solução desenvolvida..."
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none transition-all resize-none font-light ${
              state.errors?.description
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                : 'border-neutral-200 dark:border-neutral-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
          {state.errors?.description && (
            <p className="text-xs text-rose-500 mt-1">{state.errors.description[0]}</p>
          )}
        </div>

        {/* Tags / Tecnologias */}
        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-neutral-500" />
              Tecnologias & Tags (separadas por vírgula) <span className="text-rose-500">*</span>
            </span>
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            required
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Ex: Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma"
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none transition-all ${
              state.errors?.tags
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                : 'border-neutral-200 dark:border-neutral-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
          {state.errors?.tags && (
            <p className="text-xs text-rose-500 mt-1">{state.errors.tags[0]}</p>
          )}

          {/* Preview das Tags */}
          {parsedTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-xs text-neutral-500 mr-1 self-center">Preview:</span>
              {parsedTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* URLs do Repositório e Live Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* GitHub Repo */}
          <div className="space-y-2">
            <label htmlFor="repoUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5 text-neutral-500" />
              URL do Repositório (GitHub)
            </label>
            <input
              id="repoUrl"
              name="repoUrl"
              type="url"
              placeholder="https://github.com/usuario/projeto"
              disabled={isPending}
              className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none transition-all ${
                state.errors?.repoUrl
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                  : 'border-neutral-200 dark:border-neutral-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
            {state.errors?.repoUrl && (
              <p className="text-xs text-rose-500 mt-1">{state.errors.repoUrl[0]}</p>
            )}
          </div>

          {/* Live Preview */}
          <div className="space-y-2">
            <label htmlFor="liveUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              URL do Projeto Online (Live)
            </label>
            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              placeholder="https://meu-projeto.vercel.app"
              disabled={isPending}
              className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none transition-all ${
                state.errors?.liveUrl
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                  : 'border-neutral-200 dark:border-neutral-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
            {state.errors?.liveUrl && (
              <p className="text-xs text-rose-500 mt-1">{state.errors.liveUrl[0]}</p>
            )}
          </div>
        </div>

        {/* Imagem de Capa */}
        <div className="space-y-2">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-neutral-500" />
            URL da Imagem de Capa (Opcional)
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/... ou https://..."
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none transition-all ${
              state.errors?.imageUrl
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                : 'border-neutral-200 dark:border-neutral-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
          {state.errors?.imageUrl && (
            <p className="text-xs text-rose-500 mt-1">{state.errors.imageUrl[0]}</p>
          )}

          {imageUrl && (
            <div className="mt-3 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 p-2">
              <p className="text-xs text-neutral-500 mb-2">Pré-visualização da imagem:</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Preview da capa"
                className="w-full h-44 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Botão de Envio */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Salvando no Supabase...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Cadastrar Projeto</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
