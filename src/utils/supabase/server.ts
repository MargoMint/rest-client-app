import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getEnv } from '@/utils/getEnv';
import { EnvVar } from '../env-vars';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    getEnv(EnvVar.NEXT_PUBLIC_SUPABASE_URL),
    getEnv(EnvVar.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
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
