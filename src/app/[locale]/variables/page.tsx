import AppWrapper from '@/components/app-wrapper';
import { getCurrentUser } from '@/lib/auth/get-current-user';

async function VariablesPage() {
  const user = await getCurrentUser();

  return <AppWrapper user={user}>Variables</AppWrapper>;
}

export default VariablesPage;
