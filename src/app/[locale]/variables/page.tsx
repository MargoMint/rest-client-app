import AppWrapper from '@/components/app-wrapper';
import VariableListWrapper from '@/components/variables/variableList-wrapper';
import { getCurrentUser } from '@/lib/auth/get-current-user';

async function VariablesPage() {
  const user = await getCurrentUser();

  return (
    <AppWrapper user={user}>
      {user && <VariableListWrapper userId={user.id} />}
    </AppWrapper>
  );
}

export default VariablesPage;
