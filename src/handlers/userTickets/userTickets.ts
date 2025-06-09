import { NextFunction, Request, Response } from 'express';
import { BookTicketSchema } from '../../models/userTickets';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../../database';
import { getUserByEmail } from '../../repo/userRepo';
import { getTicketById, getTickets } from '../../repo/ticketRepo';
import { getUserTickets, insertTickets, markUserTicketAsFailed } from '../../repo/userTicketRepo';

export const bookTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = res.locals.user.email;
    const user = await getUserByEmail(email, true);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const tickets = req.body;

    const firstTicketId = tickets[0].ticketId;

    if (!tickets.every((ticket: BookTicketSchema) => ticket.ticketId === firstTicketId)) {
      return res.status(400).json({
        message: 'All tickets must have the same ticketId.',
      });
    }

    const seatNumbers = tickets.map((ticket: BookTicketSchema) => ticket.seatNumber);
    const uniqueSeatNumbers = new Set(seatNumbers);

    if (seatNumbers.length !== uniqueSeatNumbers.size) {
      return res.status(400).json({
        message: 'All seat numbers must be different.',
      });
    }

    const paymentId = uuidv4();

    await sequelize.transaction(async (t) => {
      const ticket = await getTicketById(firstTicketId, t);

      if (!ticket) {
        throw new Error('Ticket not found.');
      }

      if ((ticket.totalSeats - ticket.totalBooked) < seatNumbers.length) {
        throw new Error('Not enough seats available for the requested tickets.');
      }

      if (tickets.some((requestTicket: BookTicketSchema) => requestTicket.seatNumber > ticket.totalSeats )) {
        throw new Error('Requested seat number exceeds total seats available for the ticket.');
      }

      const existingTickets = await getUserTickets(firstTicketId, seatNumbers, t);

      if (existingTickets.length > 0) {
        throw new Error('Some of the requested seats are already booked.');
      }

      ticket.totalBooked += seatNumbers.length;
      await ticket.save({ transaction: t });

      await insertTickets(tickets, paymentId, email, t);
    });

    console.log('Starting ticket expiration job for paymentId:', paymentId);
    _scheduleTicketExpiration(paymentId);

    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

const activeExpirationJobs = new Map<string, NodeJS.Timeout>();

const _scheduleTicketExpiration = (paymentId: string) => {
  if (activeExpirationJobs.has(paymentId)) {
    clearTimeout(activeExpirationJobs.get(paymentId)!);
  }
  const TWO_MINUTES = 120000;
  const timeoutId = setTimeout(async () => {
    try {
      console.log(`Checking for expired tickets for paymentId: ${paymentId}`);

      const twoMinutesAgo = new Date(Date.now() - TWO_MINUTES);

      const [affectedRows] = await markUserTicketAsFailed(paymentId, twoMinutesAgo);

      if (affectedRows > 0) {
        console.log(`Marked ${affectedRows} pending tickets as failed for paymentId: ${paymentId}`);
      } else {
        console.log(`No expired tickets found for paymentId: ${paymentId}`);
      }
    } catch (error) {
      console.error(`Error in ticket expiration job for paymentId ${paymentId}:`, error);
    } finally {
      activeExpirationJobs.delete(paymentId);
    }
  }, TWO_MINUTES);

  activeExpirationJobs.set(paymentId, timeoutId);
};

export const updateTicket = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

export const fetchTickets = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserByEmail(res.locals.user.email, true);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const { limit = 10, offset = 0 } = _req.query;

    const tickets = await getTickets(Number(limit), Number(offset));

    const nextKey = {
      limit: Number(limit),
      offset: Number(offset) + tickets.length
    };

    return res.status(200).json({
      tickets,
      nextKey: tickets.length < Number(limit) ? null : nextKey,
    });
  } catch (error) {
    next(error);
  }
};
