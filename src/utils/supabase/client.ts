import { createBrowserClient } from '@supabase/ssr';
import { getEnv } from '../env';

export function createClient() {
  return createBrowserClient(
    getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    getEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
  );
}
