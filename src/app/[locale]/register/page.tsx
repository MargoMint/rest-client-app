import AuthPageLayout from '@/components/auth-page-layout';
import { getCurrentUser } from '@/lib/auth/get-current-user';

async function RegisterPage() {
  const user = await getCurrentUser();
  return <AuthPageLayout mode="register" user={user} />;
}

export default RegisterPage;
