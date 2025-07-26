import { z } from 'zod';
import { CONSTANT } from '@/config/constant';

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: z
    .string()
    .min(1, { message: 'Password is required!' })
    .min(CONSTANT.PASSWORD_LENGTH, {
      message: `Password must be at least ${CONSTANT.PASSWORD_LENGTH} characters!`,
    }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
