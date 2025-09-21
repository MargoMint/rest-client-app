'use client';

import { useLayoutEffect, useState, startTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Typography from './typography';
import { routing } from '@/i18n/routing';
import LoadingOverlay from './loading-overlay';

const LANGUAGES = ['ru', 'en'] as const;

type Language = (typeof LANGUAGES)[number];

function LanguageSwitcher() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const pathLocale = pathname.split('/')[1] as Language;
  const currentLocale: Language = LANGUAGES.includes(pathLocale)
    ? pathLocale
    : 'en';
  const currentRoute =
    Object.keys(routing.pathnames).find((route) => pathname.endsWith(route)) ??
    '/';

  const handleLanguageChange = (lang: Language) => {
    setIsNavigating(true);
    localStorage.setItem('locale', lang);

    startTransition(() => {
      router.replace(`/${lang}${currentRoute}`);
    });

    setTimeout(() => setIsNavigating(false), 1000);
  };

  useLayoutEffect(() => {
    setIsClient(true);
    const savedLocale = localStorage.getItem('locale') as Language | null;
    const alreadyOnCorrectLocale =
      savedLocale && pathname.startsWith(`/${savedLocale}`);

    if (
      savedLocale &&
      LANGUAGES.includes(savedLocale) &&
      !alreadyOnCorrectLocale
    ) {
      setIsNavigating(true);
      startTransition(() => {
        router.replace(`/${savedLocale}${currentRoute}`);
      });
      setTimeout(() => setIsNavigating(false), 800);
    }
  }, [pathname, currentRoute, router]);

  if (!isClient) {
    return (
      <Typography
        variant="caption"
        className="flex gap-1 text-[var(--gray-400)]"
      >
        <span className="invisible">RU | EN</span>
      </Typography>
    );
  }

  return (
    <>
      <LoadingOverlay isLoading={isNavigating} />
      <Typography
        variant="caption"
        className="flex gap-1 text-[var(--gray-400)]"
      >
        {LANGUAGES.map((lang, index) => (
          <span key={lang}>
            <button
              onClick={() => handleLanguageChange(lang)}
              disabled={isNavigating}
              className={`${
                currentLocale === lang ? 'font-bold text-[var(--primary)]' : ''
              } ${isNavigating ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'}`}
            >
              {lang.toUpperCase()}
            </button>
            {index < LANGUAGES.length - 1 && ' |'}
          </span>
        ))}
      </Typography>
    </>
  );
}

export default LanguageSwitcher;
