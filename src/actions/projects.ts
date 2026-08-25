'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';

export interface ActionState {
  success?: boolean;
  message?: string;
  errors?: {
    title?: string[];
    description?: string[];
    tags?: string[];
    repoUrl?: string[];
    liveUrl?: string[];
    imageUrl?: string[];
    _form?: string[];
  };
}

/**
 * Valida se uma string é uma URL válida (se fornecida).
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Server Action para cadastrar um novo projeto manualmente no banco de dados.
 */
export async function createProject(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, message: 'Acesso não autorizado.' };
    }

    const title = (formData.get('title') as string | null)?.trim() || '';
    const description = (formData.get('description') as string | null)?.trim() || '';
    const rawTags = (formData.get('tags') as string | null)?.trim() || '';
    const repoUrl = (formData.get('repoUrl') as string | null)?.trim() || '';
    const liveUrl = (formData.get('liveUrl') as string | null)?.trim() || '';
    const imageUrl = (formData.get('imageUrl') as string | null)?.trim() || '';

    const errors: NonNullable<ActionState['errors']> = {};

    // 1. Validação do Título
    if (!title) {
      errors.title = ['O título do projeto é obrigatório.'];
    } else if (title.length < 3) {
      errors.title = ['O título deve conter ao menos 3 caracteres.'];
    }

    // 2. Validação da Descrição
    if (!description) {
      errors.description = ['A descrição do projeto é obrigatória.'];
    } else if (description.length < 10) {
      errors.description = ['A descrição deve ter no mínimo 10 caracteres.'];
    }

    // 3. Processamento e validação das Tags (separadas por vírgula)
    const tags = rawTags
      ? rawTags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
      : [];

    if (tags.length === 0) {
      errors.tags = ['Informe ao menos uma tecnologia/tag (ex: React, TypeScript).'];
    }

    // 4. Validação de URLs opcionais
    if (repoUrl && !isValidUrl(repoUrl)) {
      errors.repoUrl = ['Insira uma URL válida para o repositório (ex: https://github.com/...)'];
    }

    if (liveUrl && !isValidUrl(liveUrl)) {
      errors.liveUrl = ['Insira uma URL válida para a demonstração (ex: https://...)'];
    }

    if (imageUrl && !isValidUrl(imageUrl)) {
      errors.imageUrl = ['Insira uma URL válida para a imagem de capa (ex: https://...)'];
    }

    // Se houver algum erro de validação, retorna imediatamente
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Por favor, corrija os erros no formulário.',
        errors,
      };
    }

    // 5. Inserção no Banco de Dados via Prisma Singleton
    await prisma.project.create({
      data: {
        title,
        description,
        tags,
        repoUrl: repoUrl || null,
        liveUrl: liveUrl || null,
        imageUrl: imageUrl || null,
        isCustom: true,
        published: true,
      },
    });

    // 6. Revalidação das rotas
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin');

    return {
      success: true,
      message: 'Projeto cadastrado com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    return {
      success: false,
      message: 'Ocorreu um erro interno ao salvar o projeto no banco de dados.',
      errors: {
        _form: [error instanceof Error ? error.message : 'Erro desconhecido.'],
      },
    };
  }
}

/**
 * Server Action auxiliar para deletar um projeto existente.
 */
export async function deleteProject(id: string): Promise<ActionState> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, message: 'Acesso não autorizado.' };
    }

    if (!id) {
      return { success: false, message: 'ID do projeto inválido.' };
    }

    await prisma.project.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin');

    return { success: true, message: 'Projeto removido com sucesso.' };
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    return {
      success: false,
      message: 'Não foi possível excluir o projeto.',
    };
  }
}
