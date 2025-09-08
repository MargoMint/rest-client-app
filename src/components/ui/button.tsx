import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import Typography from '../Typography';
import cn from '@/lib/utils';
import { ComponentProps } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--primary)] text-white shadow hover:bg-[var(--primary)]/90',
        disabled:
          'bg-[var(--gray-100)] text-[var(--gray-400)] shadow-sm hover:cursor-default',
        outline:
          'border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent hover:shadow-sm',
        ghost: 'hover:bg-[var(--primary)] hover:text-[var(--white)]',
        link: 'text-[var(--primary)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-6 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <Typography variant="caption">{children}</Typography>
    </Component>
  );
}

export { Button, buttonVariants };
