'use client';

import { useActionState, useEffect, useState } from 'react';
import { createPost, updatePost, type PostActionState } from '@/actions/posts';
import {
  X,
  BookOpen,
  Loader2,
  Save,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface PostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postToEdit?: PostData | null;
}

const initialState: PostActionState = {};

export function PostModal({ isOpen, onClose, postToEdit }: PostModalProps) {
  const isEditing = Boolean(postToEdit);
  const actionToUse = isEditing ? updatePost : createPost;

  const [state, formAction, isPending] = useActionState(actionToUse, initialState);
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);

  useEffect(() => {
    if (postToEdit) {
      setContent(postToEdit.content);
      setPublished(postToEdit.published);
    } else {
      setContent('');
      setPublished(true);
    }
  }, [postToEdit, isOpen]);

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => onClose(), 1000);
      return () => clearTimeout(timer);
    }
  }, [state.success, onClose]);

  if (!isOpen) return null;

  const estimatedReadingTime = Math.max(
    1,
    Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full sm:max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden my-0 sm:my-8 max-h-[92dvh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white truncate">
                {isEditing ? 'Editar Artigo' : 'Novo Artigo no Diário'}
              </h2>
              <p className="text-xs text-neutral-500 font-light line-clamp-2">
                {isEditing
                  ? 'Atualize título, conteúdo ou status de publicação.'
                  : 'Escreva uma nota ou artigo para o diário técnico.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 sm:px-6 pt-4 shrink-0">
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

        <form action={formAction} className="p-4 sm:p-6 space-y-5 overflow-y-auto overscroll-contain">
          {isEditing && postToEdit && (
            <input type="hidden" name="id" value={postToEdit.id} />
          )}

          <div className="space-y-1.5">
            <label htmlFor="post-modal-title" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Título <span className="text-rose-500">*</span>
            </label>
            <input
              id="post-modal-title"
              name="title"
              type="text"
              required
              defaultValue={postToEdit?.title || ''}
              disabled={isPending}
              placeholder="Ex: Aprendizados com Next.js e Prisma"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
            {state.errors?.title && (
              <p className="text-xs text-rose-500">{state.errors.title[0]}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="post-modal-slug" className="flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
              <span>Slug / URL {isEditing ? '' : '(opcional)'}</span>
              <span className="font-mono text-neutral-500">/journal/...</span>
            </label>
            <input
              id="post-modal-slug"
              name="slug"
              type="text"
              defaultValue={postToEdit?.slug || ''}
              disabled={isPending}
              placeholder="Deixe em branco para gerar do título"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="post-modal-content" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Conteúdo <span className="text-rose-500">*</span>
              </label>
              {content && (
                <span className="text-[11px] text-neutral-500 font-mono">
                  ~{estimatedReadingTime} min · {content.length} chars
                </span>
              )}
            </div>
            <textarea
              id="post-modal-content"
              name="content"
              rows={10}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPending}
              placeholder="Escreva seus pensamentos, trechos de código ou explicações..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-y font-light"
            />
            {state.errors?.content && (
              <p className="text-xs text-rose-500">{state.errors.content[0]}</p>
            )}
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
            <div className="space-y-0.5">
              <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 block">
                Publicar no Diário
              </span>
              <span className="text-[11px] text-neutral-500 block">
                Se desmarcado, fica como rascunho.
              </span>
            </div>
            <input
              type="checkbox"
              name="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-violet-600 focus:ring-violet-500 cursor-pointer"
            />
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : isEditing ? (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar Alterações</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Publicar Artigo</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
