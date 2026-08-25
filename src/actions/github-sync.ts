'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
}

export interface SyncResult {
  success: boolean;
  message: string;
  syncedCount?: number;
}

/**
 * Formata o nome do repositório em um título legível
 * ex: "sistema-de-vendas" -> "Sistema De Vendas" ou mantém nomes estilizados
 */
function formatRepoTitle(name: string): string {
  if (!name) return '';
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Extrai o nome de usuário do GitHub a partir de uma URL ou string
 */
function extractUsername(githubUrlOrUsername: string | null | undefined): string {
  if (!githubUrlOrUsername) return process.env.GITHUB_USERNAME || 'MarcioJSMJr';

  const cleaned = githubUrlOrUsername.trim();
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    try {
      const parsed = new URL(cleaned);
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        return parts[0];
      }
    } catch {
      // Ignora erro de parse e tenta fallback
    }
  }

  return cleaned.replace(/^@/, '') || process.env.GITHUB_USERNAME || 'MarcioJSMJr';
}

/**
 * Server Action para sincronizar repositórios públicos do GitHub com a tabela Project
 */
export async function syncGitHubProjects(): Promise<SyncResult> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, message: 'Acesso não autorizado.' };
    }

    // 1. Obter nome de usuário do perfil
    const profile = await prisma.profile.findUnique({ where: { id: 'me' } }).catch(() => null);
    const username = extractUsername(profile?.github);

    // 2. Fetch na API pública do GitHub
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'portfolio-github-sync',
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        return {
          success: false,
          message: 'Limite de requisições da API do GitHub atingido. Tente novamente mais tarde.',
        };
      }
      if (response.status === 404) {
        return {
          success: false,
          message: `Usuário do GitHub "${username}" não foi encontrado. Verifique o link do perfil.`,
        };
      }
      return {
        success: false,
        message: `Erro na API do GitHub (Status ${response.status}).`,
      };
    }

    const repos: GitHubRepo[] = await response.json();

    // 3. Filtrar repositórios (ignorar forks para focar em projetos próprios)
    const validRepos = repos.filter((repo) => !repo.fork && repo.name !== username);

    let syncedCount = 0;

    for (const repo of validRepos) {
      const rawTags: string[] = [];
      if (repo.language) rawTags.push(repo.language);
      if (Array.isArray(repo.topics)) {
        rawTags.push(...repo.topics);
      }

      // Remover duplicatas e formatar
      const tags = Array.from(new Set(rawTags.map((t) => t.trim()))).filter(Boolean);
      if (tags.length === 0) tags.push('GitHub');

      const liveUrl =
        repo.homepage && repo.homepage.trim().length > 0
          ? repo.homepage.startsWith('http')
            ? repo.homepage.trim()
            : `https://${repo.homepage.trim()}`
          : null;

      // Upsert baseado no githubId
      const existing = await prisma.project.findUnique({
        where: { githubId: repo.id },
      });

      if (existing) {
        await prisma.project.update({
          where: { githubId: repo.id },
          data: {
            title: existing.title || formatRepoTitle(repo.name),
            description: repo.description || existing.description || 'Repositório público no GitHub.',
            repoUrl: repo.html_url,
            liveUrl: liveUrl || existing.liveUrl,
            tags: tags.length > 0 ? tags : existing.tags,
            stars: repo.stargazers_count ?? 0,
            isCustom: false,
          },
        });
      } else {
        await prisma.project.create({
          data: {
            githubId: repo.id,
            title: formatRepoTitle(repo.name),
            description: repo.description || 'Repositório público no GitHub.',
            repoUrl: repo.html_url,
            liveUrl,
            tags,
            stars: repo.stargazers_count ?? 0,
            isCustom: false,
            published: true,
          },
        });
      }

      syncedCount++;
    }

    // 4. Revalidar rotas
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin');

    return {
      success: true,
      message: `Sincronização concluída! ${syncedCount} repositório(s) sincronizados com sucesso.`,
      syncedCount,
    };
  } catch (error) {
    console.error('Erro na sincronização do GitHub:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro desconhecido ao sincronizar.',
    };
  }
}

/**
 * Server Action para alternar visibilidade (published) de um projeto na vitrine
 */
export async function toggleProjectPublish(id: string, currentPublished: boolean) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, message: 'Acesso não autorizado.' };
    }

    await prisma.project.update({
      where: { id },
      data: { published: !currentPublished },
    });

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin');

    return {
      success: true,
      message: `Projeto ${!currentPublished ? 'exibido na vitrine' : 'ocultado da vitrine'}.`,
    };
  } catch (error) {
    console.error('Erro ao alternar visibilidade do projeto:', error);
    return { success: false, message: 'Erro ao alternar visibilidade.' };
  }
}
