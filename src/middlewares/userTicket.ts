import { NextFunction, Request, Response } from "express";
import { bookTicketSchema } from "../models/userTickets";

export const validateBookTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if(Array.isArray(req.body) && req.body.length > 0) {
      req.body.forEach(ticket => {
        bookTicketSchema.parse(ticket);
      });
    }
    else {
      throw JSON.stringify(bookTicketSchema.parse(req.body));
    }
    next();
  } catch (error) {
    const error_data = JSON.parse(error);
    res.status(400).json({ success: 'false', message: 'invalid body JSON', error: error_data });
  }
};