import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectsExplorer } from '@/components/ProjectsExplorer';
import { PageShell, Container, PageHeader } from '@/components/ui';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Projetos & Portfólio | Desenvolvedor Full Stack',
  description: 'Aplicações reais, sistemas e repositórios construídos com TypeScript, Next.js e PostgreSQL.',
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ stars: 'desc' }, { createdAt: 'desc' }],
  });

  return (
    <PageShell>
      <Navbar />

      <Container as="main" className="flex-1 py-10 md:py-14 space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar ao Hub Principal</span>
          </Link>
        </div>

        <PageHeader
          tone="blue"
          badge={
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Showcase de Projetos</span>
            </>
          }
          title="Projetos & Aplicações"
          description="Explore meus principais projetos, repositórios públicos e sistemas em produção com filtros por stack e busca instantânea."
        />

        <ProjectsExplorer projects={projects} itemsPerPage={6} />
      </Container>

      <Footer />
    </PageShell>
  );
}
