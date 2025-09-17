'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

export function useLogout() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('auth');

  return async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });

      if (!res.ok) {
        toast.error(t('logout.error'));
        return;
      }

      toast.success(t('logout.success'));
      router.push(`/${locale}/login`);
    } catch {
      toast.error(t('logout.error'));
    }
  };
}
