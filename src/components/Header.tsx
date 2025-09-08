import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import Typography from './Typography';

function Header() {
  return (
    <header className="w-full rounded-b-xl border-b-3 border-[var(--primary)] py-2">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={50} height={50} priority />
            <Typography variant="h3" className="text-[var(--primary)]">
              REST Client
            </Typography>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Typography
            variant="caption"
            className="flex gap-2 text-[var(--primary)]"
          >
            <Link
              href="#"
              className="text-[var(--gray-400)] hover:text-[var(--primary)]"
            >
              RU
            </Link>
            |
            <Link href="#" className="text-[var(--primary)]">
              EN
            </Link>
          </Typography>
          <div className="flex items-center gap-4">
            <Button variant="default">Sign In</Button>
            <Button variant="default">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
