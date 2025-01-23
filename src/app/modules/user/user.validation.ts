import { z } from 'zod';

const userValidationSchema = z.object({
    body: z.object({
        name: z
            .string({ required_error: 'Please provide your name' })
            .min(3, { message: 'Name must be at least 3 characters long' })
            .max(50, { message: 'Name must not exceed 50 characters' }),

        email: z
            .string({ required_error: 'Please provide your email' })
            .email({ message: 'Invalid email address' }),

        password: z
            .string({ required_error: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters long' }), // Add your password policy

        role: z
            .enum(['user', 'admin'], {
                errorMap: () => ({
                    message: 'Role must be either "user" or "admin"',
                }),
            })
            .default('user'),

        isBlocked: z.boolean().default(false),
    })
});

export const UserValidation = {
    userValidationSchema
}