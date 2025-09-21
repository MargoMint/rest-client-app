import RootLayout from '@/app/[locale]/layout';
import { getMessages } from '@/i18n/messages';
import { notFound } from 'next/navigation';

jest.mock('@/app/globals.css', () => ({}));

jest.mock('@/i18n/messages', () => ({
  getMessages: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

jest.mock('@/components/ui/toast-wrapper', () => {
  const MockToastWrapper = () => (
    <div className="toast-wrapper">ToastWrapper</div>
  );
  MockToastWrapper.displayName = 'ToastWrapper';
  return MockToastWrapper;
});

describe('RootLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls notFound for invalid locale', async () => {
    const children = <div>Test child</div>;

    await RootLayout({ children, params: Promise.resolve({ locale: 'fr' }) });

    expect(notFound).toHaveBeenCalled();
  });

  test('calls getMessages with correct locale', async () => {
    const children = <div />;
    await RootLayout({ children, params: Promise.resolve({ locale: 'ru' }) });
    expect(getMessages).toHaveBeenCalledWith('ru');
  });
});
