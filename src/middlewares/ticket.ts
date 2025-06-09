import { NextFunction, Request, Response } from "express";
import { createTicketSchema } from "../models/ticket";

export const validateCreateTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await createTicketSchema.parseAsync(req.body);
    next();
  } catch (error) {
    const error_data = JSON.parse(error);
    res.status(400).json({ success: 'false', message: 'invalid body JSON', error: error_data });
  }
};