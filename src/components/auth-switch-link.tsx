'use client';

import Typography from '@/components/typography';
import { AuthFormType } from '@/lib/auth/auth-handlers';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Props = {
  mode: AuthFormType;
};

function AuthSwitchLink({ mode }: Props) {
  const t = useTranslations(`auth.${mode}.switch`);
  const href = mode === 'register' ? '/login' : '/register';

  return (
    <Typography variant="body">
      {t('textLink')}{' '}
      <Link href={href} passHref>
        <Button variant="link" className="px-0 text-[var(--primary)]" asChild>
          {t('linkForm')}
        </Button>
      </Link>
    </Typography>
  );
}

export default AuthSwitchLink;
