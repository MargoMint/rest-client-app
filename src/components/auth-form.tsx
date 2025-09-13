'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '@/validation/auth-schemes';
import { submitAuth } from '@/lib/auth/auth-handlers';
import type {
  AuthFormType,
  LoginValues,
  RegisterValues,
} from '@/lib/auth/auth-handlers';
import AuthField from './auth-field';

type AuthFormProps = {
  mode: AuthFormType;
};

function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const schema = mode === 'register' ? registerSchema : loginSchema;
  const validationMode = mode === 'register' ? 'onChange' : 'onSubmit';

  const form = useForm<RegisterValues | LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: validationMode,
  });

  const onSubmit = async (values: RegisterValues | LoginValues) => {
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
        <div>
          <Button
            type="submit"
            variant="default"
            disabled={!form.formState.isValid}
          >
            {mode === 'register' ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AuthForm;
