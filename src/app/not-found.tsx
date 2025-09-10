import Typography from '@/components/typography';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center justify-center gap-5">
        <Image src="/logo.png" alt="logo" width={80} height={80} priority />

        <div className="flex flex-col gap-1 border-l-3 border-[var(--primary)] pl-5">
          <Typography variant="h2" className="text-[var(--primary)]">
            404 Not Found
          </Typography>
          <Typography variant="body">Oops, there is no such page</Typography>
        </div>
      </div>

      <Link href="/">
        <Button variant="link">Back to home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
