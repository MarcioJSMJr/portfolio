import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Projetos & Portfólio | Desenvolvedor Full Stack',
  description: 'Aplicações reais, sistemas e experimentos construídos com TypeScript, Next.js e PostgreSQL.',
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-blue-500/30 selection:text-white flex flex-col justify-between transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 w-full space-y-8">
        {/* Barra superior de navegação */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar ao Hub Principal</span>
          </Link>
        </div>

        {/* Header da Página de Projetos */}
        <header className="space-y-4 text-center sm:text-left border-b border-neutral-200 dark:border-neutral-900 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase de Projetos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Projetos & Aplicações
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
            Uma seleção dos meus principais projetos em produção e estudos práticos, cobrindo front-end moderno, back-end, bancos relacionais e APIs escaláveis.
          </p>
        </header>

        {/* Seção de Projetos */}
        <ProjectsSection projects={projects} />
      </main>

      <Footer />
    </div>
  );
}
