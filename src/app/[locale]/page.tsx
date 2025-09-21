import AppWrapper from '@/components/app-wrapper';
import Hero from '@/components/hero';
import Team from '@/components/team';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import WelcomeSection from '@/components/welcome-section';

async function Home() {
  const user = await getCurrentUser();

  return (
    <AppWrapper user={user}>
      <WelcomeSection user={user} />
      <Hero />
      <Team />
    </AppWrapper>
  );
}

export default Home;
