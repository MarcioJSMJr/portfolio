'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';

export interface PostActionState {
  success?: boolean;
  message?: string;
  errors?: {
    title?: string[];
    slug?: string[];
    content?: string[];
    _form?: string[];
  };
}

/**
 * Converte um título em um slug limpo para URL
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .trim()
    .replace(/\s+/g, '-') // substitui espaços por hífens
    .replace(/[^\w-]+/g, '') // remove caracteres não alfanuméricos
    .replace(/--+/g, '-'); // remove hífens repetidos
}

/**
 * Server Action para criar um novo Post no diário
 */
export async function createPost(
  prevState: PostActionState | null,
  formData: FormData
): Promise<PostActionState> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, message: 'Acesso não autorizado.' };
    }

    const title = (formData.get('title') as string | null)?.trim() || '';
    const customSlug = (formData.get('slug') as string | null)?.trim() || '';
    const content = (formData.get('content') as string | null)?.trim() || '';
    const published = formData.get('published') === 'on' || formData.get('published') === 'true';

    const errors: NonNullable<PostActionState['errors']> = {};

    if (!title || title.length < 3) {
      errors.title = ['O título deve conter pelo menos 3 caracteres.'];
    }

    if (!content || content.length < 10) {
      errors.content = ['O conteúdo deve ter pelo menos 10 caracteres.'];
    }

    let finalSlug = slugify(customSlug || title);
    if (!finalSlug) {
      finalSlug = `post-${Date.now()}`;
    }

    // Verificar unicidade do slug
    const existingPost = await prisma.post.findUnique({
      where: { slug: finalSlug },
    });

    if (existingPost) {
      finalSlug = `${finalSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Por favor, corrija os campos do post.',
        errors,
      };
    }

    await prisma.post.create({
      data: {
        title,
        slug: finalSlug,
        content,
        published,
      },
    });

    revalidatePath('/journal');
    revalidatePath(`/journal/${finalSlug}`);
    revalidatePath('/admin');

    return {
      success: true,
      message: 'Post publicado com sucesso no Diário!',
    };
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return {
      success: false,
      message: 'Erro interno ao salvar o post no banco de dados.',
      errors: {
        _form: [error instanceof Error ? error.message : 'Erro desconhecido.'],
      },
    };
  }
}

/**
 * Server Action para excluir um post do diário
 */
export async function deletePost(id: string): Promise<PostActionState> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, message: 'Acesso não autorizado.' };
    }

    if (!id) {
      return { success: false, message: 'ID do post inválido.' };
    }

    await prisma.post.delete({
      where: { id },
    });

    revalidatePath('/journal');
    revalidatePath('/admin');

    return { success: true, message: 'Post excluído com sucesso.' };
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    return {
      success: false,
      message: 'Não foi possível excluir o post.',
    };
  }
}

/**
 * Server Action para alternar o status de publicação de um post
 */
export async function togglePostPublish(id: string, currentStatus: boolean): Promise<PostActionState> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, message: 'Acesso não autorizado.' };
    }

    await prisma.post.update({
      where: { id },
      data: { published: !currentStatus },
    });

    revalidatePath('/journal');
    revalidatePath('/admin');

    return { success: true, message: 'Status atualizado com sucesso.' };
  } catch (error) {
    console.error('Erro ao alterar status:', error);
    return { success: false, message: 'Falha ao atualizar status do post.' };
  }
}
