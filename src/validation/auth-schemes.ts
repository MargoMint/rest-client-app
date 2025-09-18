import z from 'zod';

export const getRegisterSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email({ message: t('email.invalid') }),
    password: z
      .string()
      .min(8, { message: t('password.min') })
      .refine((val) => /[A-Z]/.test(val), {
        message: t('password.uppercase'),
      })
      .refine((val) => /[0-9]/.test(val), {
        message: t('password.digit'),
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: t('password.special'),
      })
      .refine((val) => /^[\p{L}\p{N}\p{P}\p{S}]+$/u.test(val), {
        message: t('password.unicode'),
      }),
  });

export const getLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email({ message: t('email.invalid') }),
    password: z.string().min(1, { message: t('password.required') }),
  });

export type RegisterValues = z.infer<ReturnType<typeof getRegisterSchema>>;
export type LoginValues = z.infer<ReturnType<typeof getLoginSchema>>;
