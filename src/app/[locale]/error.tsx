'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Typography from '@/components/typography';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Image src="/logo.png" alt="logo" width={80} height={80} priority />
        <Typography variant="h2" className="text-2xl text-[var(--primary)]">
          Oops! Something went wrong
        </Typography>
        <Typography variant="body" className="text-gray-600">
          {error.message || 'Unexpected application error'}
        </Typography>
        <Button variant="default" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
}
