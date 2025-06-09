import { NextFunction, Request, Response } from "express";
import { createUserSchema } from "../models/user";

export const validateCreateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await createUserSchema.parseAsync(req.body);
    next();
  } catch (error) {
    const error_data = JSON.parse(error);
    res.status(400).json({ success: 'false', message: 'invalid body JSON', error: error_data });
  }
};