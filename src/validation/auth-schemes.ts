import z from 'zod';

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(8, { message: 'Minimum 8 characters' })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Must contain at least one uppercase letter',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Must contain at least one digit',
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: 'Must contain at least one special character',
    })
    .refine((val) => /^[\p{L}\p{N}\p{P}\p{S}]+$/u.test(val), {
      message: 'Password must support Unicode',
    }),
});
