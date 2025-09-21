import { getMessages } from '@/i18n/messages';
import requestConfig from '@/i18n/request';
import * as messagesModule from '@/i18n/messages';
import { routing } from '@/i18n/routing';

jest.mock('../../messages/en.json', () => ({ hello: 'world' }), {
  virtual: true,
});

jest.mock('../../messages/ru.json', () => ({ hi: 'привет' }), {
  virtual: true,
});

jest.mock('next-intl/server', () => ({
  getRequestConfig: (cb: unknown) => cb as unknown,
}));

describe('requestConfig', () => {
  beforeAll(() => {
    jest
      .spyOn(messagesModule, 'getMessages')
      .mockImplementation(async (locale) => ({
        test: `messages for ${locale}`,
      }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('returns requested locale when supported', async () => {
    const result = await requestConfig({
      requestLocale: Promise.resolve(routing.locales[0]),
    });
    expect(result.locale).toBe(routing.locales[0]);
    expect(result.messages).toEqual({
      test: `messages for ${routing.locales[0]}`,
    });
  });

  test('falls back to default locale when unsupported', async () => {
    const result = await requestConfig({
      requestLocale: Promise.resolve('xx'),
    });
    expect(result.locale).toBe(routing.defaultLocale);
    expect(result.messages).toEqual({
      test: `messages for ${routing.defaultLocale}`,
    });
  });
});

describe('getMessages', () => {
  test('loads english messages', async () => {
    const result = await getMessages('en');
    expect(result).toEqual({ hello: 'world' });
  });

  test('loads russian messages', async () => {
    const result = await getMessages('ru');
    expect(result).toEqual({ hi: 'привет' });
  });
});
