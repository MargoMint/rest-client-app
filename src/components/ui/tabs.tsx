'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import cn from '@/lib/utils';
import { ComponentProps } from 'react';
import Typography from '../typography';

function Tabs({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'text-muted-foreground inline-flex h-10 items-center justify-center gap-1 rounded-lg bg-[var(--primary)] p-2',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex cursor-pointer items-center justify-between rounded-md px-3 py-1 whitespace-nowrap text-[var(--white)]',
        'transition-colors duration-200',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        'hover:bg-[var(--white)] hover:text-[var(--dark)]',
        'data-[state=active]:bg-[var(--white)] data-[state=active]:text-[var(--dark)] data-[state=active]:shadow',
        className,
      )}
      {...props}
    >
      <Typography variant="caption">{children}</Typography>
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
