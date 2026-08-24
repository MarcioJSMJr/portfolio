'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';

export interface QuickLinkActionState {
  success?: boolean;
  message?: string;
  errors?: {
    title?: string[];
    url?: string[];
    icon?: string[];
    order?: string[];
    _form?: string[];
  };
}

/**
 * Server Action para cadastrar um novo botão na página inicial (QuickLink)
 */
export async function createQuickLink(
  prevState: QuickLinkActionState | null,
  formData: FormData
): Promise<QuickLinkActionState> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, message: 'Acesso não autorizado.' };
    }

    const title = (formData.get('title') as string | null)?.trim() || '';
    const url = (formData.get('url') as string | null)?.trim() || '';
    const icon = (formData.get('icon') as string | null)?.trim() || '';
    const rawOrder = (formData.get('order') as string | null)?.trim() || '0';
    const highlight = formData.get('highlight') === 'on' || formData.get('highlight') === 'true';

    const errors: NonNullable<QuickLinkActionState['errors']> = {};

    if (!title || title.length < 2) {
      errors.title = ['O título do link é obrigatório.'];
    }

    if (!url) {
      errors.url = ['A URL de destino é obrigatória.'];
    }

    const order = parseInt(rawOrder, 10) || 0;

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Por favor, preencha os campos obrigatórios.',
        errors,
      };
    }

    await prisma.quickLink.create({
      data: {
        title,
        url,
        icon: icon || null,
        highlight,
        order,
      },
    });

    revalidatePath('/');
    revalidatePath('/admin');

    return {
      success: true,
      message: 'Link cadastrado com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao criar quick link:', error);
    return {
      success: false,
      message: 'Erro interno ao salvar o link no banco de dados.',
      errors: {
        _form: [error instanceof Error ? error.message : 'Erro desconhecido.'],
      },
    };
  }
}

/**
 * Server Action para deletar um QuickLink
 */
export async function deleteQuickLink(id: string): Promise<QuickLinkActionState> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, message: 'Acesso não autorizado.' };
    }

    if (!id) {
      return { success: false, message: 'ID do link inválido.' };
    }

    await prisma.quickLink.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/admin');

    return { success: true, message: 'Link excluído com sucesso.' };
  } catch (error) {
    console.error('Erro ao excluir link:', error);
    return {
      success: false,
      message: 'Não foi possível excluir o link.',
    };
  }
}
