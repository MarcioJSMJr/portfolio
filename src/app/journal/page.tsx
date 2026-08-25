import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JournalExplorer } from '@/components/JournalExplorer';
import { BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Diário Técnico & Artigos | Portfólio',
  description: 'Pensamentos, anotações de estudo e experiências com desenvolvimento Full Stack.',
};

export default async function JournalPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-purple-500/30 selection:text-white flex flex-col justify-between transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 w-full space-y-10">
        {/* Header do Diário */}
        <header className="space-y-4 text-center sm:text-left border-b border-neutral-200 dark:border-neutral-900 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Diário de Bordo & Artigos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Anotações, Estudos & Ideias
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
            Um espaço pessoal para documentar aprendizados diários, soluções de bugs, reflexões sobre arquitetura e novidades do ecossistema Full Stack com busca instantânea.
          </p>
        </header>

        {/* Explorador de Artigos com Busca & Paginação */}
        <JournalExplorer posts={posts} itemsPerPage={6} />
      </main>

      <Footer />
    </div>
  );
}
