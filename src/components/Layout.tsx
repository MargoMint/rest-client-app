import { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 justify-center">
        <div className="w-full max-w-[1200px] px-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
