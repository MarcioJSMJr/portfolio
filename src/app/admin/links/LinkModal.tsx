'use client';

import { useActionState, useEffect, useState } from 'react';
import { createQuickLink, updateQuickLink, type QuickLinkActionState } from '@/actions/links';
import {
  X,
  Link2,
  Loader2,
  Save,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface LinkData {
  id: string;
  title: string;
  url: string;
  icon: string | null;
  highlight: boolean;
  order: number;
}

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  linkToEdit?: LinkData | null;
  defaultOrder?: number;
}

const initialState: QuickLinkActionState = {};

export function LinkModal({
  isOpen,
  onClose,
  linkToEdit,
  defaultOrder = 0,
}: LinkModalProps) {
  const isEditing = Boolean(linkToEdit);
  const actionToUse = isEditing ? updateQuickLink : createQuickLink;

  const [state, formAction, isPending] = useActionState(actionToUse, initialState);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(linkToEdit?.highlight ?? false);
  }, [linkToEdit, isOpen]);

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => onClose(), 1000);
      return () => clearTimeout(timer);
    }
  }, [state.success, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full sm:max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden my-0 sm:my-8 max-h-[92dvh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
              <Link2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white truncate">
                {isEditing ? 'Editar Link do Hub' : 'Novo Botão no Hub'}
              </h2>
              <p className="text-xs text-neutral-500 font-light line-clamp-2">
                {isEditing
                  ? 'Atualize título, URL, ordem ou destaque.'
                  : 'Cadastre um botão para a página inicial.'}
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
          {isEditing && linkToEdit && (
            <input type="hidden" name="id" value={linkToEdit.id} />
          )}

          <div className="space-y-1.5">
            <label htmlFor="link-modal-title" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Título do Botão <span className="text-rose-500">*</span>
            </label>
            <input
              id="link-modal-title"
              name="title"
              type="text"
              required
              defaultValue={linkToEdit?.title || ''}
              disabled={isPending}
              placeholder="Ex: Agende uma Mentoria"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
            {state.errors?.title && (
              <p className="text-xs text-rose-500">{state.errors.title[0]}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="link-modal-url" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              URL de Destino <span className="text-rose-500">*</span>
            </label>
            <input
              id="link-modal-url"
              name="url"
              type="url"
              required
              defaultValue={linkToEdit?.url || ''}
              disabled={isPending}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
            {state.errors?.url && (
              <p className="text-xs text-rose-500">{state.errors.url[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="link-modal-order" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Ordem
              </label>
              <input
                id="link-modal-order"
                name="order"
                type="number"
                defaultValue={linkToEdit?.order ?? defaultOrder}
                disabled={isPending}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="link-modal-icon" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Ícone (opcional)
              </label>
              <input
                id="link-modal-icon"
                name="icon"
                type="text"
                defaultValue={linkToEdit?.icon || ''}
                disabled={isPending}
                placeholder="github, linkedin..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
            <div className="space-y-0.5">
              <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 block">
                Botão em Destaque
              </span>
              <span className="text-[11px] text-neutral-500 block">
                Aplica ênfase visual no Hub.
              </span>
            </div>
            <input
              type="checkbox"
              name="highlight"
              checked={highlight}
              onChange={(e) => setHighlight(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-sky-600 focus:ring-sky-500 cursor-pointer"
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
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
                  <span>Adicionar Botão</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
