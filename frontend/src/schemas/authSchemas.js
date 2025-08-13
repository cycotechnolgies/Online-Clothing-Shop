import { z } from "zod";

// Reusable password rule (import this elsewhere if needed)
export const basePassword = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "Add an uppercase letter")
  .regex(/[a-z]/, "Add a lowercase letter")
  .regex(/[0-9]/, "Add a number");

// Signup schema
export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    phone: z
      .string()
      .min(7, "Phone number looks too short")
      .regex(/^[0-9+\-\s()]*$/, "Use digits and + - ( ) only")
      .optional()
      .or(z.literal("")),
    email: z.string().email("Enter a valid email"),
    password: basePassword,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
