import AppWrapper from '@/components/app-wrapper';
import Hero from '@/components/hero';
import Team from '@/components/team';
import WelcomeSection from '@/components/welcome-section';
import { getCurrentUser } from '@/utils/supabase/get-current-user';

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <AppWrapper>
      <WelcomeSection user={currentUser} />
      <Hero />
      <Team />
    </AppWrapper>
  );
}
