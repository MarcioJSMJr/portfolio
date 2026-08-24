'use client';

import { useState } from 'react';
import { Mail, Check, Copy, Sparkles, MessageCircle, Send } from 'lucide-react';
import { LinkedInIcon, WhatsAppIcon } from '@/components/icons';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = 'contato.desenvolvedor@exemplo.com'; // Pode ser personalizado

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contato" className="py-20 border-t border-neutral-900 relative">
      {/* Luz ambiente de fundo */}
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 p-8 sm:p-12 text-center space-y-8 relative overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vamos Conversar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tem um projeto em mente?
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Estou sempre aberto a novas oportunidades, colaborações em projetos desafiadores ou apenas para trocar ideias sobre tecnologia.
            </p>
          </div>

          {/* Cards de Contato Rápido */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Email */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col items-center justify-between gap-3 text-center group">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">E-mail</span>
                <span className="text-xs text-neutral-400 block mt-0.5 truncate max-w-[180px]">
                  {email}
                </span>
              </div>
              <div className="flex items-center gap-2 w-full pt-1">
                <a
                  href={`mailto:${email}`}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-colors text-center"
                >
                  Enviar E-mail
                </a>
                <button
                  onClick={handleCopy}
                  title="Copiar e-mail"
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col items-center justify-between gap-3 text-center group">
              <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 group-hover:scale-110 transition-transform">
                <LinkedInIcon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">LinkedIn</span>
                <span className="text-xs text-neutral-400 block mt-0.5">Conecte-se profissionalmente</span>
              </div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-all text-center shadow-md shadow-blue-500/20"
              >
                Ver Perfil
              </a>
            </div>

            {/* WhatsApp */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col items-center justify-between gap-3 text-center group">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">WhatsApp</span>
                <span className="text-xs text-neutral-400 block mt-0.5">Mensagem rápida e direta</span>
              </div>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-medium text-white transition-all text-center shadow-md shadow-emerald-500/20"
              >
                Conversar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
