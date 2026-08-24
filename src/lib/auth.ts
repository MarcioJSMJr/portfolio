import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_COOKIE_NAME = 'admin_session';

/**
 * Gera um token seguro baseado na senha mestra
 */
function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  return crypto.createHash('sha256').update(password + '_portfolio_salt_2026').digest('hex');
}

/**
 * Verifica se a sessão atual possui o cookie de admin válido
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!sessionToken) return false;

  return sessionToken === getExpectedToken();
}

/**
 * Define o cookie de sessão autenticada do admin
 */
export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, getExpectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  });
}

/**
 * Limpa o cookie de sessão do admin
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Valida se a senha fornecida bate com a ADMIN_PASSWORD configurada
 */
export function verifyPassword(password: string): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return password === expectedPassword;
}
