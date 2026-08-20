import { z } from "zod";
export const RegsiterSchema = z.object({
  fullName: z.string().trim().min(3, "fullName must have atleast 3 chars"),
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
  password: z.string().trim().min(6, "Passwprd must be atleast 6 char"),
});

export const RegsiterWithGoogleSchema = z.object({
  fullName: z.string().trim().min(3, "fullName must have atleast 3 chars"),
  email: z
    .string()
    .trim()
    .min(1, "email is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .trim()
    .min(1,"Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  
});