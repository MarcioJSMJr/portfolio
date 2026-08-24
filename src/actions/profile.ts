'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';

export interface ProfileActionState {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    bio?: string[];
    avatar?: string[];
    email?: string[];
    github?: string[];
    linkedin?: string[];
    twitter?: string[];
    _form?: string[];
  };
}

/**
 * Server Action para salvar ou atualizar os dados do Perfil (id fixo: "me")
 */
export async function upsertProfile(
  prevState: ProfileActionState | null,
  formData: FormData
): Promise<ProfileActionState> {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, message: 'Acesso não autorizado.' };
    }

    const name = (formData.get('name') as string | null)?.trim() || '';
    const bio = (formData.get('bio') as string | null)?.trim() || '';
    const avatar = (formData.get('avatar') as string | null)?.trim() || '';
    const email = (formData.get('email') as string | null)?.trim() || '';
    const github = (formData.get('github') as string | null)?.trim() || '';
    const linkedin = (formData.get('linkedin') as string | null)?.trim() || '';
    const twitter = (formData.get('twitter') as string | null)?.trim() || '';

    const errors: NonNullable<ProfileActionState['errors']> = {};

    if (!name || name.length < 2) {
      errors.name = ['O nome deve ter pelo menos 2 caracteres.'];
    }

    if (!bio || bio.length < 5) {
      errors.bio = ['A bio deve ter pelo menos 5 caracteres.'];
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Por favor, corrija os erros no formulário.',
        errors,
      };
    }

    await prisma.profile.upsert({
      where: { id: 'me' },
      update: {
        name,
        bio,
        avatar: avatar || null,
        email: email || null,
        github: github || null,
        linkedin: linkedin || null,
        twitter: twitter || null,
      },
      create: {
        id: 'me',
        name,
        bio,
        avatar: avatar || null,
        email: email || null,
        github: github || null,
        linkedin: linkedin || null,
        twitter: twitter || null,
      },
    });

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath('/journal');
    revalidatePath('/links');

    return {
      success: true,
      message: 'Perfil atualizado com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return {
      success: false,
      message: 'Ocorreu um erro ao salvar o perfil.',
      errors: {
        _form: [error instanceof Error ? error.message : 'Erro desconhecido.'],
      },
    };
  }
}
