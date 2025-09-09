import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getEnv } from '../env';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    getEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Ignored: running in Server Component
          }
        },
      },
    },
  );
}
