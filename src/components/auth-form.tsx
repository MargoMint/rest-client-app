'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validation/auth-schemes';
import { submitAuth } from '@/lib/auth-handlers';
import type { AuthFormType } from '@/lib/auth-handlers';
import AuthField from './auth-field';

type AuthFormProps = {
  mode: AuthFormType;
};

function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const schema = registerSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    submitAuth(mode, values, form, router);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <AuthField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          control={form.control}
        />
        <AuthField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          control={form.control}
        />
        <Button type="submit" variant="default">
          {mode === 'register' ? 'Sign Up' : 'Sign In'}
        </Button>
      </form>
    </Form>
  );
}

export default AuthForm;
