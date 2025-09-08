import cn from '@/lib/utils';
import { PropsWithChildren, ElementType } from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';

interface TypographyProps {
  variant: TypographyVariant;
  className?: string;
}

const variantMap: Record<
  TypographyVariant,
  { element: ElementType; styles: string }
> = {
  h1: { element: 'h1', styles: 'text-4xl font-bold' },
  h2: { element: 'h2', styles: 'text-2xl font-bold' },
  h3: { element: 'h3', styles: 'text-lg font-bold' },
  body: { element: 'p', styles: 'text-base font-normal' },
  caption: { element: 'span', styles: 'text-sm font-medium' },
};

function Typography({
  variant,
  className,
  children,
}: PropsWithChildren<TypographyProps>) {
  const { element: Tag, styles } = variantMap[variant];

  return <Tag className={cn(styles, className)}>{children}</Tag>;
}

export default Typography;
