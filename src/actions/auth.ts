'use server';

import { revalidatePath } from 'next/cache';
import { verifyPassword, setAdminSession, clearAdminSession } from '@/lib/auth';

export interface AuthState {
  success?: boolean;
  message?: string;
  error?: string;
}

/**
 * Server Action para autenticar o administrador com senha mestra
 */
export async function loginAdmin(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  try {
    const password = (formData.get('password') as string | null)?.trim() || '';

    if (!password) {
      return {
        success: false,
        error: 'Por favor, digite a senha mestra.',
      };
    }

    if (!verifyPassword(password)) {
      return {
        success: false,
        error: 'Senha incorreta. Verifique suas credenciais.',
      };
    }

    await setAdminSession();
    revalidatePath('/admin');

    return {
      success: true,
      message: 'Autenticado com sucesso!',
    };
  } catch (error) {
    console.error('Erro na autenticação de admin:', error);
    return {
      success: false,
      error: 'Ocorreu um erro ao processar a autenticação.',
    };
  }
}

/**
 * Server Action para deslogar da área administrativa
 */
export async function logoutAdmin(): Promise<void> {
  await clearAdminSession();
  revalidatePath('/admin');
}
