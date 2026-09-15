import { prisma } from '@/lib/prisma';
import { HubPage } from '@/components/hub';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Hub & Portfólio | Desenvolvedor Full Stack',
  description: 'Conheça meus projetos, diário técnico e principais links profissionais.',
};

export default async function Home() {
  const [profile, customLinks, projectsCount, postsCount] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 'me' } }).catch(() => null),
    prisma.quickLink.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.project.count({ where: { published: true } }).catch(() => 0),
    prisma.post.count({ where: { published: true } }).catch(() => 0),
  ]);

  return (
    <HubPage
      name={profile?.name || 'Desenvolvedor Full Stack'}
      bio={
        profile?.bio ||
        'Especialista no ecossistema React, Next.js, TypeScript e PostgreSQL no Supabase. Foco em interfaces excepcionais e arquitetura robusta.'
      }
      avatar={profile?.avatar}
      email={profile?.email}
      github={profile?.github}
      linkedin={profile?.linkedin}
      twitter={profile?.twitter}
      customLinks={customLinks}
      projectsCount={projectsCount}
      postsCount={postsCount}
    />
  );
}
