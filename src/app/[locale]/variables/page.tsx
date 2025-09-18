import AppWrapper from '@/components/app-wrapper';
import VariableList from '@/components/variables/variables-list';
import { getCurrentUser } from '@/lib/auth/get-current-user';

async function VariablesPage() {
  const user = await getCurrentUser();

  return (
    <AppWrapper user={user}>
      <VariableList userId={user?.id} />
    </AppWrapper>
  );
}

export default VariablesPage;
