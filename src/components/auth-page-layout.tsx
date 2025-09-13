import AppWrapper from '@/components/app-wrapper';
import AuthForm from '@/components/auth-form';
import Typography from '@/components/typography';
import { AuthFormType } from '@/lib/auth-handlers';
import AuthSwitchLink from './auth-switch-link';

function AuthPageLayout({ mode }: { mode: AuthFormType }) {
  const titleMap: Record<AuthFormType, string> = {
    login: 'Welcome to REST Client',
    register: 'Create your account',
  };

  const title = titleMap[mode];

  return (
    <AppWrapper>
      <div className="flex h-full items-center justify-center">
        <div className="flex h-[408px] w-[550px] flex-col justify-between self-center rounded-[20px] bg-[var(--white)] px-16 py-8 text-center shadow-[0px_0px_11.6px_5px_rgba(0,0,0,0.08)]">
          <Typography variant="h2" className="text-[var(--primary)]">
            {title}
          </Typography>
          <AuthForm mode={mode} />
          <AuthSwitchLink mode={mode} />
        </div>
      </div>
    </AppWrapper>
  );
}

export default AuthPageLayout;
