import Typography from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { WELCOME_TEXTS } from '@/constants/welcome-texts';
import { User } from '@supabase/supabase-js';

interface WelcomeSectionProps {
  user: User | null;
}

function WelcomeSection({ user }: WelcomeSectionProps) {
  const displayName = user?.user_metadata?.full_name || user?.email || 'Friend';

  return (
    <div className="flex h-[90vh] max-w-[1200px] justify-center">
      <div className="flex max-w-[650px] flex-col justify-center gap-4">
        {!user ? (
          <>
            <Typography
              variant="h1"
              className="text-center text-[var(--primary)] capitalize"
            >
              {WELCOME_TEXTS.titleUnauthenticated}
            </Typography>
            <Typography variant="body" className="text-center">
              {WELCOME_TEXTS.bodyUnauthenticated}
            </Typography>
            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full max-w-[50%] items-center justify-center gap-4 rounded-lg bg-[var(--primary)]">
                <Link href="/signin">
                  <Button
                    variant="default"
                    className="hover:text-white hover:underline"
                  >
                    Sign In
                  </Button>
                </Link>
                <Typography variant="body" className="text-center text-white">
                  /
                </Typography>
                <Link href="/register">
                  <Button
                    variant="default"
                    className="hover:text-white hover:underline"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <Typography
              variant="h1"
              className="text-center text-[var(--primary)]"
            >
              {WELCOME_TEXTS.title}
              <br />
              {displayName}!
            </Typography>
            <Typography variant="body" className="text-center">
              {WELCOME_TEXTS.body}
            </Typography>
            <div className="flex flex-col items-center gap-4">
              <Tabs className="mt-4 max-w-[70%]">
                <TabsList>
                  <TabsTrigger value="rest-client">REST Client</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="variables">Variables</TabsTrigger>
                </TabsList>
                <TabsContent value="rest-client">
                  <Typography variant="body">REST Client Content</Typography>
                </TabsContent>
                <TabsContent value="history">
                  <Typography variant="body">History Content</Typography>
                </TabsContent>
                <TabsContent value="variables">
                  <Typography variant="body">Variables Content</Typography>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WelcomeSection;
