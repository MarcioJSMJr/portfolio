'use client';

import { useActionState, useEffect, useRef } from 'react';
import { createQuickLink, type QuickLinkActionState } from '@/actions/links';
import { Link2, PlusCircle, CheckCircle2, AlertCircle, Loader2, Globe } from 'lucide-react';
import { DeleteQuickLinkButton } from './DeleteQuickLinkButton';

interface QuickLinkFormProps {
  links: Array<{
    id: string;
    title: string;
    url: string;
    icon: string | null;
    highlight: boolean;
    order: number;
  }>;
}

const initialState: QuickLinkActionState = {};

export function QuickLinkForm({ links }: QuickLinkFormProps) {
  const [state, formAction, isPending] = useActionState(createQuickLink, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="space-y-8">
      {/* Formulário de Criação de Link */}
      <div className="bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Adicionar Botão no Hub
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light">
              Cadastre novos botões para redes sociais, links externos ou serviços no Hub inicial.
            </p>
          </div>
        </div>

        {state.success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">{state.message}</p>
              <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
                O novo botão já foi incluído na página inicial do Hub.
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

        <form ref={formRef} action={formAction} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Título do Link */}
            <div className="space-y-1.5">
              <label htmlFor="link-title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Título do Botão <span className="text-rose-500">*</span>
              </label>
              <input
                id="link-title"
                name="title"
                type="text"
                required
                disabled={isPending}
                placeholder="Ex: Agende uma Mentoria / Consultoria"
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
              {state.errors?.title && (
                <p className="text-xs text-rose-500 mt-1">{state.errors.title[0]}</p>
              )}
            </div>

            {/* URL */}
            <div className="space-y-1.5">
              <label htmlFor="link-url" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                URL de Destino <span className="text-rose-500">*</span>
              </label>
              <input
                id="link-url"
                name="url"
                type="url"
                required
                disabled={isPending}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
              {state.errors?.url && (
                <p className="text-xs text-rose-500 mt-1">{state.errors.url[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ordem de exibição */}
            <div className="space-y-1.5">
              <label htmlFor="link-order" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Ordem de Exibição
              </label>
              <input
                id="link-order"
                name="order"
                type="number"
                defaultValue={links.length}
                disabled={isPending}
                placeholder="0, 1, 2..."
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            {/* Destaque */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800/80 self-end">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 block">Botão em Destaque</span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Aplica borda e gradiente colorido</span>
              </div>
              <input
                type="checkbox"
                name="highlight"
                className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-sm shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Cadastrando...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Adicionar Botão</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Botões Cadastrados */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
            Botões Ativos no Hub
          </h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
            {links.length} {links.length === 1 ? 'botão' : 'botões'}
          </span>
        </div>

        {links.length === 0 ? (
          <div className="p-8 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 text-center space-y-2">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">Nenhum botão extra cadastrado no Hub.</p>
            <p className="text-neutral-500 dark:text-neutral-500 text-xs">
              A tela inicial já possui os botões padrão ("Ver Projetos" e "Ler Diário").
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 flex items-center justify-between gap-4 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-neutral-900 dark:text-white">{link.title}</span>
                      {link.highlight && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono font-semibold">
                          Destaque
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block truncate max-w-sm">
                      {link.url}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500 font-mono">Ordem: {link.order}</span>
                  <DeleteQuickLinkButton id={link.id} title={link.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
