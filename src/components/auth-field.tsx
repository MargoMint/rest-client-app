'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { LoginValues, RegisterValues } from '@/lib/auth/auth-handlers';
import { useTranslations } from 'next-intl';

type AuthValues = RegisterValues | LoginValues;

type Props = {
  name: keyof AuthValues;

  type: 'email' | 'password';
  control: Control<AuthValues>;
  mode: 'login' | 'register';
};

function AuthField({ name, type, control, mode }: Props) {
  const tLabel = useTranslations(`auth.${mode}.label`);
  const tPlaceholder = useTranslations(`auth.${mode}.placeholder`);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{tLabel(name)}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={tPlaceholder(name)} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default AuthField;
