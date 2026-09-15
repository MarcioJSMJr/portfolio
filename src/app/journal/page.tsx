import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JournalExplorer } from '@/components/JournalExplorer';
import { PageShell, Container, PageHeader } from '@/components/ui';
import { BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Diário Técnico & Artigos | Portfólio',
  description: 'Pensamentos, anotações de estudo e experiências com desenvolvimento Full Stack.',
};

export default async function JournalPage() {
  const posts = await prisma.post
    .findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => []);

  return (
    <PageShell accent="purple">
      <Navbar />

      <Container as="main" size="full" className="flex-1 py-8 md:py-12 space-y-10">
        <PageHeader
          tone="purple"
          badge={
            <>
              <BookOpen className="w-3.5 h-3.5" />
              <span>Diário de Bordo & Artigos</span>
            </>
          }
          title="Anotações, Estudos & Ideias"
          description="Um espaço pessoal para documentar aprendizados diários, soluções de bugs, reflexões sobre arquitetura e novidades do ecossistema Full Stack com busca instantânea."
        />

        <JournalExplorer posts={posts} itemsPerPage={8} />
      </Container>

      <Footer />
    </PageShell>
  );
}
