import { z } from "zod";

export const baseSchema = {
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
} as const;

export const loginSchema = z.object(baseSchema);

export const signupSchema = z.object({
    ...baseSchema,
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"]
        });
    }
});

export type LoginSchema = typeof loginSchema;
export type SignupSchema = typeof signupSchema;
export type LoginFormData = z.infer<LoginSchema>;
export type SignupFormData = z.infer<SignupSchema>; 