import { PropsWithChildren } from 'react';
import Header from './header';
import Footer from './footer';
import { User } from '@supabase/supabase-js';

type AppWrapperProps = PropsWithChildren & {
  user: User | null;
};

function AppWrapper({ children, user }: AppWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <main className="relative flex flex-1 justify-center overflow-hidden">
        <div className="w-full max-w-[1200px] px-4 pt-4 pb-20">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default AppWrapper;
