import type { ElementType, ReactNode } from 'react';

const widths = {
  /** Leitura de artigo / formulários estreitos */
  sm: 'max-w-lg',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  /** Conteúdo editorial um pouco mais largo */
  xl: 'max-w-5xl',
  /** Páginas densas com teto confortável */
  '2xl': 'max-w-7xl',
  /** Quase tela cheia, ainda com teto em monitores ultra-wide */
  wide: 'max-w-[90rem]',
  /** Tela cheia: só padding lateral, sem max-width */
  full: 'max-w-none',
} as const;

interface ContainerProps {
  children: ReactNode;
  size?: keyof typeof widths;
  className?: string;
  as?: ElementType;
}

/**
 * Wrapper de largura das páginas públicas.
 * Default = `full` (ocupa a tela). O Hub NÃO usa este default no card —
 * ele mantém `max-w-xl` próprio para a estética Linktree.
 */
export function Container({
  children,
  size = 'full',
  className = '',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 ${widths[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
