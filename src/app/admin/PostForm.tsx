'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { createPost, type PostActionState } from '@/actions/posts';
import { BookOpen, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

const initialState: PostActionState = {};

export function PostForm() {
  const [state, formAction, isPending] = useActionState(createPost, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setTitle('');
      setContent('');
    }
  }, [state.success]);

  const estimatedReadingTime = Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200));

  return (
    <div className="bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Novo Post no Diário
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light">
            Escreva pensamentos, estudos ou artigos para seu diário pessoal.
          </p>
        </div>
      </div>

      {state.success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">{state.message}</p>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
              O post já está disponível na seção /journal.
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
          <label htmlFor="post-title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Título do Artigo / Nota <span className="text-rose-500">*</span>
          </label>
          <input
            id="post-title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Aprendizados com Next.js 16 e Prisma 7"
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none transition-all ${
              state.errors?.title
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                : 'border-neutral-200 dark:border-neutral-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
            }`}
          />
          {state.errors?.title && (
            <p className="text-xs text-rose-500 mt-1">{state.errors.title[0]}</p>
          )}
        </div>

        {/* Slug customizado */}
        <div className="space-y-2">
          <label htmlFor="post-slug" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
            <span>Slug / URL Personalizada (Opcional)</span>
            <span className="text-xs text-neutral-500 font-mono">/journal/seu-slug</span>
          </label>
          <input
            id="post-slug"
            name="slug"
            type="text"
            placeholder="Deixe em branco para gerar automaticamente do título"
            disabled={isPending}
            className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
          />
        </div>

        {/* Conteúdo */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="post-content" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Conteúdo do Post <span className="text-rose-500">*</span>
            </label>
            {content && (
              <span className="text-xs text-neutral-500 font-mono">
                ~{estimatedReadingTime} min de leitura ({content.length} caracteres)
              </span>
            )}
          </div>
          <textarea
            id="post-content"
            name="content"
            rows={10}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva seus pensamentos, trechos de código ou explicações..."
            disabled={isPending}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none transition-all resize-y font-light ${
              state.errors?.content
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                : 'border-neutral-200 dark:border-neutral-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
            }`}
          />
          {state.errors?.content && (
            <p className="text-xs text-rose-500 mt-1">{state.errors.content[0]}</p>
          )}
        </div>

        {/* Status de Publicação */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800/80">
          <div className="space-y-0.5">
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 block">
              Publicar Imediatamente
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
              Se marcado, o post ficará visível publicamente na rota /journal.
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="published"
              defaultChecked
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {/* Botão de Envio */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm shadow-md shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publicando...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Publicar Artigo</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
