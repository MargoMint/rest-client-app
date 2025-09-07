'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type AuthFormProps = {
  mode: 'register' | 'login';
};

const schema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(8, { message: 'Minimum 8 characters' })
    .regex(/^[\p{L}\p{N}\p{P}\p{S}]+$/u, {
      message: 'Password must support Unicode',
    }),
});

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const handleSupabaseError = (message: string) => {
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

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { email, password } = values;

    const { data, error } =
      mode === 'register'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      handleSupabaseError(error.message);
      return;
    }

    const token = data.session?.access_token;
    const expires = data.session?.expires_in;
    console.log('Access token:', token);
    console.log('Expires in:', expires);

    toast.success(
      mode === 'register' ? 'Successful registration' : 'Login done',
    );
    router.push('/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default">
          {mode === 'register' ? 'Sign Up' : 'Sign In'}
        </Button>
      </form>
    </Form>
  );
}
