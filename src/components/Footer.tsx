import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowUp, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedInIcon, MailIcon, TwitterIcon } from '@/components/icons';

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const profile = await prisma.profile.findUnique({ where: { id: 'me' } }).catch(() => null);

  const name = profile?.name || 'Portfólio.dev';
  const bio = profile?.bio || 'Desenvolvedor Full Stack • Next.js, React, TypeScript e Supabase';
  const github = profile?.github;
  const linkedin = profile?.linkedin;
  const email = profile?.email;
  const twitter = profile?.twitter;

  const hasAnySocial = Boolean(github || linkedin || email || twitter);

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-900 bg-white/80 dark:bg-neutral-950/90 text-neutral-600 dark:text-neutral-400 text-sm transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo e Tagline Dinâmicos */}
          <div className="space-y-1 text-center md:text-left max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-neutral-900 dark:text-white hover:opacity-90 transition-opacity"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs shadow-sm shadow-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
                {name}
              </span>
            </Link>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 line-clamp-2">
              {bio}
            </p>
          </div>

          {/* Redes Sociais Dinâmicas do Admin */}
          <div className="flex items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all hover:scale-105 shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}

            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:scale-105 shadow-sm"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                title="E-mail"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-105 shadow-sm"
              >
                <MailIcon className="w-4 h-4" />
              </a>
            )}

            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter / X"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all hover:scale-105 shadow-sm"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}

            {!hasAnySocial && (
              <span className="text-xs text-neutral-500 font-mono">
                Links sociais configuráveis no Admin
              </span>
            )}
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {currentYear} Todos os direitos reservados. Construído com Next.js (App Router), Tailwind CSS e Prisma.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
