import Typography from '@/components/typography';
import { AuthFormType } from '@/lib/auth/auth-handlers';
import Link from 'next/link';
import { Button } from './ui/button';

type Props = {
  mode: AuthFormType;
};

function AuthSwitchLink({ mode }: Props) {
  const isRegister = mode === 'register';

  const text = isRegister
    ? 'Already have an account?'
    : 'Don’t have an account?';

  const linkText = isRegister ? 'Sign In' : 'Sign Up';
  const href = isRegister ? '/login' : '/register';

  return (
    <Typography variant="body">
      {text}{' '}
      <Link href={href} passHref>
        <Button variant="link" className="px-0 text-[var(--primary)]" asChild>
          {linkText}
        </Button>
      </Link>
    </Typography>
  );
}

export default AuthSwitchLink;
