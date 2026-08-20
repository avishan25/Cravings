import { email, z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(3, "Full name must be at least 3 characters"),

  email: z
    .string()
    .trim()
    .min(1, "email is required")
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "email is required")
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});


export const googleRegisterSchema = z.object({
  fullName: z.string().trim().min(3, "Full name must be at least 3 characters"),

  email: z.string().trim().min(1, "email is Required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
});