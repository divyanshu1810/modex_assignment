import { z } from 'zod';

export const bookTicketSchema = z.object({
  ticketId: z
    .string({ message: "Ticket ID is required" }),
  seatNumber: z
    .number({ message: "Seat number must be a number" })
    .int({ message: "Seat number must be an integer" })
    .positive({ message: "Seat number must be positive" }),
})

export type BookTicketSchema = z.infer<typeof bookTicketSchema>;