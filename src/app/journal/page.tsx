import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookOpen, Calendar, Clock, ArrowRight, Newspaper } from 'lucide-react';

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
            Um espaço pessoal para documentar aprendizados diários, soluções de bugs, reflexões sobre arquitetura e novidades do ecossistema Full Stack.
          </p>
        </header>

        {/* Lista de Artigos */}
        <section className="space-y-6">
          {posts.length === 0 ? (
            <div className="p-12 sm:p-16 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 text-center space-y-3 max-w-lg mx-auto transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Nenhum post publicado ainda</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light">
                Novas reflexões e artigos práticos serão postados aqui em breve.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {posts.map((post) => {
                const words = post.content.split(/\s+/).filter(Boolean).length;
                const readingTime = Math.max(1, Math.ceil(words / 200));

                return (
                  <Link
                    key={post.id}
                    href={`/journal/${post.slug}`}
                    className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80 hover:border-purple-400 dark:hover:border-purple-500/40 hover:bg-neutral-50/80 dark:hover:bg-neutral-900/80 transition-all group block shadow-sm hover:shadow-md hover:shadow-purple-500/5 space-y-4"
                  >
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

                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors tracking-tight">
                        {post.title}
                      </h2>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3 font-light">
                        {post.content}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300">
                      <span>Ler artigo completo</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
