import { z } from 'zod';

export const createTicketSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" }),
  showTime: z
    .number({ message: "Show time must be a number" })
    .int({ message: "Show time must be an integer" })
    .positive({ message: "Show time must be positive" }),
  price: z
    .number({ message: "Price must be a number" })
    .positive({ message: "Price must be greater than 0" }),
});

export type CreateTicketSchema = z.infer<typeof createTicketSchema>;