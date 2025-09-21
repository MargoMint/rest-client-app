import { renderHook, act } from '@testing-library/react';
import { useLogout } from '@/hooks/use-logout';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('useLogout', () => {
  const pushMock = jest.fn();
  const tMock = jest.fn((key) => key);

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useLocale as jest.Mock).mockReturnValue('en');
    (useTranslations as jest.Mock).mockReturnValue(tMock);

    pushMock.mockClear();
    tMock.mockClear();
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
  });

  test('successfully logout and redirect', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true } as Response),
    ) as jest.Mock;

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current();
    });

    expect(toast.success).toHaveBeenCalledWith('logout.success');
    expect(pushMock).toHaveBeenCalledWith('/en/login');
  });

  test('show an error if the API response is unsuccessful.', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: false } as Response),
    ) as jest.Mock;

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current();
    });

    expect(toast.error).toHaveBeenCalledWith('logout.error');
    expect(pushMock).not.toHaveBeenCalled();
  });

  test('show an error when throwing an exception', async () => {
    global.fetch = jest.fn(() => Promise.reject('network error')) as jest.Mock;
    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current();
    });

    expect(toast.error).toHaveBeenCalledWith('logout.error');
    expect(pushMock).not.toHaveBeenCalled();
  });
});
