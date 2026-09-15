import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowUp, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedInIcon, MailIcon, TwitterIcon } from '@/components/icons';
import { Container, SocialIconLink } from '@/components/ui';

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
    <footer className="border-t border-border bg-white/80 dark:bg-neutral-950/90 text-neutral-600 dark:text-neutral-400 text-sm transition-colors duration-200">
      <Container className="py-12 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-foreground hover:opacity-90 transition-opacity"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs shadow-sm shadow-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
                {name}
              </span>
            </Link>
            <p className="text-xs text-neutral-500 line-clamp-2">{bio}</p>
          </div>

          <div className="flex items-center gap-3">
            {github && (
              <SocialIconLink href={github} title="GitHub" className="p-2.5 rounded-xl">
                <GithubIcon className="w-4 h-4" />
              </SocialIconLink>
            )}
            {linkedin && (
              <SocialIconLink
                href={linkedin}
                title="LinkedIn"
                className="p-2.5 rounded-xl hover:text-blue-500 dark:hover:text-blue-400"
              >
                <LinkedInIcon className="w-4 h-4" />
              </SocialIconLink>
            )}
            {email && (
              <SocialIconLink
                href={`mailto:${email}`}
                title="E-mail"
                className="p-2.5 rounded-xl hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <MailIcon className="w-4 h-4" />
              </SocialIconLink>
            )}
            {twitter && (
              <SocialIconLink href={twitter} title="Twitter / X" className="p-2.5 rounded-xl">
                <TwitterIcon className="w-4 h-4" />
              </SocialIconLink>
            )}
            {!hasAnySocial && (
              <span className="text-xs text-neutral-500 font-mono">
                Links sociais configuráveis no Admin
              </span>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {currentYear} Todos os direitos reservados. Construído com Next.js (App Router), Tailwind CSS e Prisma.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-foreground transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
