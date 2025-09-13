import { createSupabaseServerClient } from '@/utils/supabase/server';

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user
    ? { name: user.user_metadata?.name ?? user.email ?? 'User' }
    : null;
}
