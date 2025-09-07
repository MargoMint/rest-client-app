import { createBrowserClient } from '@supabase/ssr';
import { getEnv } from '@/utils/getEnv';
import { EnvVar } from '../env-vars';

export function createClient() {
  return createBrowserClient(
    getEnv(EnvVar.NEXT_PUBLIC_SUPABASE_URL),
    getEnv(EnvVar.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
  );
}
