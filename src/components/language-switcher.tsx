'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import Typography from './typography';

const LANGUAGES = ['ru', 'en'];

function LanguageSwitcher() {
  const pathname = usePathname();

  const pathLocale = pathname.split('/')[1];
  const currentLocale = LANGUAGES.includes(pathLocale) ? pathLocale : 'en';

  const currentRoute =
    (Object.keys(routing.pathnames) as (keyof typeof routing.pathnames)[]).find(
      (route) => pathname.endsWith(route),
    ) || '/';

  return (
    <Typography variant="caption" className="flex gap-1 text-[var(--gray-400)]">
      {LANGUAGES.map((lang, index) => (
        <span key={lang}>
          <Link
            key={lang}
            href={currentRoute}
            locale={lang}
            className={
              currentLocale === lang ? 'font-bold text-[var(--primary)]' : ''
            }
          >
            {lang.toUpperCase()}
          </Link>
          {index < LANGUAGES.length - 1 && ' |'}
        </span>
      ))}
    </Typography>
  );
}

export default LanguageSwitcher;
