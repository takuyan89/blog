'use server';
import { registerSchema } from '@/validations/user';
import bcryptjs from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { ZodError } from 'zod';

type ActionState = { success: boolean; errors: Record<string, string[]> };

function handleValidationError(error: ZodError): ActionState {
  const { fieldErrors, formErrors } = error.flatten();
  const castedFieldErrors = fieldErrors as Record<string, string[]>;
  if (formErrors.length > 0) {
    return { success: false, errors: { ...fieldErrors, confirmPassword: formErrors } };
  }
  return { success: false, errors: castedFieldErrors };
}

function handleError(customErrors: Record<string, string[]>): ActionState {
  return { success: false, errors: customErrors };
}

export async function createUser(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const rawFormData = Object.fromEntries(
    ['name', 'email', 'password', 'confirmPassword'].map((field) => [field, formData.get(field) as string])
  ) as Record<string, string>;

  const validationResult = registerSchema.safeParse(rawFormData);
  if (!validationResult.success) {
    return handleValidationError(validationResult.error);
  }
  const existingUser = await prisma.user.findUnique({ where: { email: rawFormData.email } });
  if (existingUser) {
    return handleError({ email: ['このメールアドレスはすでに登録されています'] });
  }

  const hashedPassword = await bcryptjs.hash(rawFormData.password, 12);

  await prisma.user.create({
    data: {
      name: rawFormData.name,
      email: rawFormData.email,
      password: hashedPassword,
    },
  });
  await signIn('credentials', {
    ...Object.fromEntries(formData),
    redirect: false,
  });
  redirect('/dashboard');
}
