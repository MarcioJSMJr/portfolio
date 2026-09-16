'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { createProject, updateProject, type ActionState } from '@/actions/projects';
import { X, Sparkles, Loader2, Save, PlusCircle, Image as ImageIcon, Globe, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon } from '@/components/icons';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  stars?: number;
  isCustom?: boolean;
  published?: boolean;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: ProjectData | null;
}

const initialState: ActionState = {};

export function ProjectModal({ isOpen, onClose, projectToEdit }: ProjectModalProps) {
  const isEditing = Boolean(projectToEdit);
  const actionToUse = isEditing ? updateProject : createProject;

  const [state, formAction, isPending] = useActionState(actionToUse, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const [tagInput, setTagInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(true);

  // Inicializar dados do projeto quando abrir
  useEffect(() => {
    if (projectToEdit) {
      setTagInput(projectToEdit.tags.join(', '));
      setImageUrl(projectToEdit.imageUrl || '');
      setPublished(projectToEdit.published !== false);
    } else {
      setTagInput('');
      setImageUrl('');
      setPublished(true);
    }
  }, [projectToEdit, isOpen]);

  // Fechar modal em caso de sucesso
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.success, onClose]);

  if (!isOpen) return null;

  const parsedTags = tagInput
    ? tagInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                {isEditing ? 'Editar Projeto' : 'Cadastrar Novo Projeto'}
              </h2>
              <p className="text-xs text-neutral-500 font-light">
                {isEditing
                  ? 'Atualize as informações, links ou imagem do projeto.'
                  : 'Preencha os detalhes para adicionar à vitrine.'}
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

        {/* Feedback de Sucesso ou Erro */}
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

        {/* Formulário */}
        <form ref={formRef} action={formAction} className="p-6 space-y-5">
          {isEditing && projectToEdit && (
            <input type="hidden" name="id" value={projectToEdit.id} />
          )}

          {/* Título */}
          <div className="space-y-1.5">
            <label htmlFor="modal-title" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Título do Projeto <span className="text-rose-500">*</span>
            </label>
            <input
              id="modal-title"
              name="title"
              type="text"
              required
              defaultValue={projectToEdit?.title || ''}
              disabled={isPending}
              placeholder="Ex: Plataforma SaaS de Gerenciamento"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-1.5">
            <label htmlFor="modal-description" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Descrição Detalhada <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="modal-description"
              name="description"
              rows={3}
              required
              defaultValue={projectToEdit?.description || ''}
              disabled={isPending}
              placeholder="Descreva a solução, stack e principais destaques..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none font-light"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label htmlFor="modal-tags" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-neutral-400" />
              <span>Tecnologias & Tags (separadas por vírgula) <span className="text-rose-500">*</span></span>
            </label>
            <input
              id="modal-tags"
              name="tags"
              type="text"
              required
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              disabled={isPending}
              placeholder="Ex: Next.js, React, TypeScript, Tailwind CSS, PostgreSQL"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            {parsedTags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {parsedTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="modal-repoUrl" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-neutral-400" />
                <span>Link do Repositório (GitHub)</span>
              </label>
              <input
                id="modal-repoUrl"
                name="repoUrl"
                type="url"
                defaultValue={projectToEdit?.repoUrl || ''}
                disabled={isPending}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="modal-liveUrl" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span>Link do Projeto Online (Live Demo)</span>
              </label>
              <input
                id="modal-liveUrl"
                name="liveUrl"
                type="url"
                defaultValue={projectToEdit?.liveUrl || ''}
                disabled={isPending}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Imagem de Capa */}
          <div className="space-y-1.5">
            <label htmlFor="modal-imageUrl" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
              <span>URL da Imagem de Capa (Opcional)</span>
            </label>
            <input
              id="modal-imageUrl"
              name="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={isPending}
              placeholder="https://images.unsplash.com/... ou link de screenshot"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            {imageUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 max-h-36 bg-neutral-100 dark:bg-neutral-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Preview da capa"
                  className="w-full h-36 object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Visibilidade */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
            <div className="space-y-0.5">
              <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 block">
                Exibir na Vitrine Pública
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">
                Se desmarcado, o projeto ficará oculto em /projects.
              </span>
            </div>
            <input
              type="checkbox"
              name="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>

          {/* Botões do Rodapé do Modal */}
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
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
                  <span>Cadastrar Projeto</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
