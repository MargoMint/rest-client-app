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

type AuthValues = RegisterValues | LoginValues;

type Props = {
  name: keyof AuthValues;
  label: string;
  placeholder: string;
  type: 'email' | 'password';
  control: Control<AuthValues>;
};

function AuthField({ name, label, placeholder, type, control }: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default AuthField;
