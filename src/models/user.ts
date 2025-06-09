import { z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(5, { message: "Name must be at least 5 characters long" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Please provide a valid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  userType: z
    .enum(['admin', 'customer'], { 
      message: "User type must be either 'admin' or 'customer'" 
    }),
});