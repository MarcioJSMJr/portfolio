'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { loginAdmin, type AuthState } from '@/actions/auth';
import { Lock, Eye, EyeOff, ArrowLeft, Shield, Loader2, AlertCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const initialState: AuthState = {};

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex items-center justify-center p-4 relative selection:bg-blue-500/30 transition-colors duration-200">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-blue-600/10 via-indigo-500/10 to-purple-600/10 dark:from-blue-600/15 dark:via-indigo-500/15 dark:to-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Painel de Acesso
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Área restrita. Digite a senha mestra para gerenciar o portfólio.
              </p>
            </div>
          </div>

          {/* Erro */}
          {state.error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          {/* Formulário de Senha */}
          <form action={formAction} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Senha Mestra
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="••••••••••••"
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validando...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Acessar Painel</span>
                </>
              )}
            </button>
          </form>

          {/* Rodapé / Link de retorno */}
          <div className="pt-2 text-center border-t border-neutral-100 dark:border-neutral-800/60">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Hub Principal</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
