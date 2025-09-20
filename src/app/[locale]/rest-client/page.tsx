import AppWrapper from '@/components/app-wrapper';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import RestClientLayout from '@/components/rest-client/rest-client-layout';
import TabsLinks from '@/components/tabs-links';

async function RestClientPage() {
  const user = await getCurrentUser();

  return (
    <AppWrapper user={user}>
      <TabsLinks />
      <RestClientLayout />
    </AppWrapper>
  );
}

export default RestClientPage;
