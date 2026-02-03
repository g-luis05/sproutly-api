import * as z from 'zod';

export const requestOtpSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
});

export const verifyOtpSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    code: z.string().length(6, { message: "Code must be 6 digits" }),
});