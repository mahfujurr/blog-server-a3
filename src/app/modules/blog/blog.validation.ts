import { z } from 'zod';

const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        content: z.string().min(1, 'Content is required'),
        isPublished: z.boolean().optional().default(true),

    })
});
const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required').optional(),
        content: z.string().min(1, 'Content is required').optional(),
        isPublished: z.boolean().optional(),
    })
});

export const blogValidationSchema = {
    createBlogValidationSchema,
    updateBlogValidationSchema
    }



