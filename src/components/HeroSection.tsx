import { ArrowDown, Mail, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedInIcon, WhatsAppIcon, FileTextIcon } from '@/components/icons';

export function HeroSection() {
  return (
    <section id="sobre" className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      {/* Luzes decorativas de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/15 to-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-neutral-900/90 border border-neutral-800 text-neutral-300 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Disponível para novos projetos e oportunidades</span>
        </div>

        {/* Título Principal */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
            Criando experiências digitais com{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
              código moderno
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
            Olá! Sou desenvolvedor <strong className="text-neutral-200 font-semibold">Full Stack</strong> especializado no ecossistema{' '}
            <strong className="text-neutral-200 font-semibold">React, Next.js e TypeScript</strong>, com foco em arquitetura performática, banco de dados e interfaces excepcionais.
          </p>
        </div>

        {/* Botões de Ação Principal */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-white text-sm font-medium transition-all hover:scale-105 shadow-md shadow-black/20"
          >
            <GithubIcon className="w-4 h-4 text-white" />
            <span>GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-white text-sm font-medium transition-all hover:scale-105 shadow-md shadow-black/20"
          >
            <LinkedInIcon className="w-4 h-4 text-blue-400" />
            <span>LinkedIn</span>
          </a>

          {/* WhatsApp / Contato Rápido */}
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-sm font-medium transition-all hover:scale-105"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Ver Projetos */}
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-sm font-medium transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
          >
            <span>Ver Projetos</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
