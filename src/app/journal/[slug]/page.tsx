import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Calendar, Clock, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: 'Post Não Encontrado | Diário',
    };
  }

  return {
    title: `${post.title} | Diário de Desenvolvimento`,
    description: post.content.slice(0, 160),
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  const words = post.content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-purple-500/30 selection:text-white flex flex-col justify-between transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 w-full space-y-8">
        {/* Link de Retorno */}
        <div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar ao Diário</span>
          </Link>
        </div>

        {/* Cabeçalho do Post */}
        <header className="space-y-4 border-b border-neutral-200 dark:border-neutral-800/80 pb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-mono">
            <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min de leitura
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Corpo do Artigo */}
        <article className="space-y-6 text-neutral-800 dark:text-neutral-300 leading-relaxed text-base sm:text-lg font-light">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Rodapé do Artigo */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Mais anotações no Diário</span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Conhecer meus projetos →</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
