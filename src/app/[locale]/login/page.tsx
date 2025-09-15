import AuthPageLayout from '@/components/auth-page-layout';
import { getCurrentUser } from '@/lib/auth/get-current-user';

async function LoginPage() {
  const user = await getCurrentUser();

  return <AuthPageLayout mode="login" user={user} />;
}

export default LoginPage;
