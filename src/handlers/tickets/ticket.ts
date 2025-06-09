import { Request, Response } from 'express';
import { getTicketByEmailAndName, insertTicket } from '../../repo/ticketRepo';

export const createTicket = async (req: Request, res: Response) => {
  try {
    const email = res.locals.user.email;
    const { name, showTime, price, totalSeats } = req.body;
    const existingMovie = await getTicketByEmailAndName(email, name, showTime);
    if (existingMovie) {
      return res.status(400).json({ message: 'Ticket already exists for this movie at this time.' });
    }

    await insertTicket(email, name, showTime, price, totalSeats);
    res.status(201).json({});
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
