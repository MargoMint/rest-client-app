import type { Metadata } from 'next';
import '../globals.css';
import { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from '@/i18n/messages';
import ToastWrapper from '@/components/ui/toast-wrapper';

export const metadata: Metadata = {
  title: 'REST Client',
  description: 'Final project for the RS School React Course',
};

type LocaleLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!['en', 'ru'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-montserrat">
        <NextIntlClientProvider messages={messages}>
          {children}
          <ToastWrapper />
        </NextIntlClientProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          closeOnClick
          theme="colored"
        />
      </body>
    </html>
  );
}
