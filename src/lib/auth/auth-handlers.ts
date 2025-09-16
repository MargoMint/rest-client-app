import { createClient } from '@/utils/supabase/client';
import { LoginValues, RegisterValues } from '@/validation/auth-schemes';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

export type AuthFormType = 'register' | 'login';

export const submitAuth = async (
  mode: AuthFormType,
  values: RegisterValues | LoginValues,
  form: UseFormReturn<RegisterValues | LoginValues>,
  router: AppRouterInstance,
) => {
  const supabase = createClient();
  const { email, password } = values;

  const { error } =
    mode === 'register'
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    form.setError('email', { message: error.message });
    toast.error(error.message);
    return;
  }

  toast.success(mode === 'register' ? 'Successful registration' : 'Login done');
  router.push('/');
};
