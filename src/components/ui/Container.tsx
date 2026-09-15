import type { ElementType, ReactNode } from 'react';

const widths = {
  sm: 'max-w-lg',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-4xl',
  '2xl': 'max-w-6xl',
} as const;

interface ContainerProps {
  children: ReactNode;
  size?: keyof typeof widths;
  className?: string;
  as?: ElementType;
}

export function Container({
  children,
  size = '2xl',
  className = '',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${widths[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
