import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/login': '/login',
    '/register': '/register',
    '/history': '/history',
    '/variables': '/variables',
    '/rest-client': '/rest-client',
  },
});
