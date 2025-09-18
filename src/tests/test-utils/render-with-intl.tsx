import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';

export function renderWithIntl(ui: ReactNode, { locale = 'en' } = {}) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}
