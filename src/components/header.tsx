'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from './ui/button';
import Typography from './typography';
import useStickyHeader from '@/hooks/use-sticky-header';
import cn from '@/lib/utils';
import { User } from '@supabase/supabase-js';
import LanguageSwitcher from './language-switcher';

type HeaderProps = {
  user: User | null;
};

function Header({ user }: HeaderProps) {
  const isAuthenticated = !!user;
  const isSticky = useStickyHeader();
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full rounded-b-xl border-b-3 border-[var(--primary)] bg-transparent py-2 transition-all duration-400',
        {
          'bg-[var(--gray-100)] py-0 shadow-lg': isSticky,
        },
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 transition-all duration-400">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={50} height={50} priority />
            <Typography variant="h3" className="text-[var(--primary)]">
              REST Client
            </Typography>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <form action="/api/logout" method="POST">
                <Button type="submit" variant="default">
                  Sign Out
                </Button>
              </form>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="default">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button variant="default">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
