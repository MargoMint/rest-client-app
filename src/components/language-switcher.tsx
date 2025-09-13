'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import Typography from './typography';

function LanguageSwitcher() {
  const pathname = usePathname();

  const currentRoute =
    (Object.keys(routing.pathnames) as (keyof typeof routing.pathnames)[]).find(
      (route) => pathname.endsWith(route),
    ) || '/';

  return (
    <Typography variant="caption" className="flex gap-2 text-[var(--primary)]">
      <Link
        href={currentRoute}
        locale="ru"
        className="hover:text-[var(--gray-400)]"
      >
        RU
      </Link>
      |
      <Link
        href={currentRoute}
        locale="en"
        className="hover:text-[var(--gray-400)]"
      >
        EN
      </Link>
    </Typography>
  );
}

export default LanguageSwitcher;
