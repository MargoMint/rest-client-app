import AppWrapper from '@/components/app-wrapper';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import RestClientLayout from '@/components/rest-client/rest-client-layout';
import TabsWrapper from '@/components/tabs-wrapper';

async function RestClientPage() {
  const user = await getCurrentUser();

  return (
    <AppWrapper user={user}>
      <TabsWrapper />
      <RestClientLayout />
    </AppWrapper>
  );
}

export default RestClientPage;
