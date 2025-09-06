import cn from '@/lib/utils';
import { PropsWithChildren } from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';

interface TypographyProps {
  variant: TypographyVariant;
  className?: string;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-lg font-bold',
  body: 'text-base font-normal',
  caption: 'text-sm font-medium',
};

function Typography({
  variant,
  className,
  children,
}: PropsWithChildren<TypographyProps>) {
  return (
    <span className={cn(variantStyles[variant], className)}>{children}</span>
  );
}

export default Typography;
