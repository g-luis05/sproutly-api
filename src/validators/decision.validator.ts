import * as z from 'zod';
import { DecisionStatus } from '../domain/enums/decision-status.enum';

export const createDecisionSchema = z.object({
    title: z.string().min(1, { message: "Title must be at least 1 character" }),
    description: z.string().min(1, { message: "Description must be at least 1 character" }),
    topicId: z.string().uuid({ message: "Invalid topic id" }),
    parentId: z.string().uuid().optional().nullable(),
    order: z.number().optional().nullable(),
});

export const updateDecisionSchema = z.object({
    title: z.string().min(1, { message: "Title must be at least 1 character" }).optional(),
    description: z.string().min(1, { message: "Description must be at least 1 character" }).optional(),
    status: z.nativeEnum(DecisionStatus).optional(),
    order: z.number().optional().nullable(),
});

export const idValidatorSchemaParams = z.object({
    id: z.string().uuid({ message: "Invalid id" }),
});
