import { PropsWithChildren } from 'react';
import Header from './header';
import Footer from './footer';

function AppWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-1 justify-center overflow-hidden">
        <div className="w-full max-w-[1200px] px-4 pt-4 pb-20">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default AppWrapper;
