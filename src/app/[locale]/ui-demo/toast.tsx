'use client';

import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

function Toast() {
  const t = useTranslations('toast');

  const showSuccess = () => toast.success(t('success'));
  const showError = () => toast.error(t('error'));
  const showInfo = () => toast.info(t('info'));
  const showWarning = () => toast.warn(t('warning'));
  const showDefault = () => toast(t('default'));

  return (
    <div className="flex items-start gap-2">
      <Button onClick={showSuccess} variant="default">
        {t('success')}
      </Button>
      <Button onClick={showError} variant="default">
        {t('error')}
      </Button>
      <Button onClick={showInfo} variant="default">
        {t('info')}
      </Button>
      <Button onClick={showWarning} variant="default">
        {t('warning')}
      </Button>
      <Button onClick={showDefault} variant="default">
        {t('default')}
      </Button>
      <ToastContainer />
    </div>
  );
}

export default Toast;
