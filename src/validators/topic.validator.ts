import * as z from 'zod';


export const createTopicSchema = z.object({
    title: z.string().min(1, { message: "Title must be at least 1 character" }),
    description: z.string().optional(),
});

export const updateTopicSchema = z.object({
    title: z.string().min(1, { message: "Title must be at least 1 character" }).optional(),
    description: z.string().optional(),
});

export const idValidatorSchemaParams = z.object({
    id: z.string().uuid({ message: "Invalid id" }),
});