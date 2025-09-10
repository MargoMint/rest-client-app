import { createClient } from '@/utils/supabase/client';
import { registerSchema } from '@/validation/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';

export type AuthForm = 'register' | 'login';

type RegisterValues = z.infer<typeof registerSchema>;

export const handleSupabaseError = (
  form: UseFormReturn<RegisterValues>,
  message: string,
) => {
  const msg = message.toLowerCase();

  if (msg.includes('invalid login')) {
    form.setError('password', { message: 'Incorrect email or password' });
  } else if (
    msg.includes('already registered') ||
    msg.includes('user already exists')
  ) {
    form.setError('email', { message: 'User already registered' });
  } else if (msg.includes('password')) {
    form.setError('password', { message });
  } else {
    toast.error(message);
  }
};

export const submitAuth = async (
  mode: AuthForm,
  values: RegisterValues,
  form: UseFormReturn<RegisterValues>,
  router: AppRouterInstance,
) => {
  const supabase = createClient();
  const { email, password } = values;
  const { data, error } =
    mode === 'register'
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    handleSupabaseError(form, error.message);
    return;
  }

  const token = data.session?.access_token;
  console.log('Access token:', token);

  toast.success(mode === 'register' ? 'Successful registration' : 'Login done');
  router.push('/');
};
