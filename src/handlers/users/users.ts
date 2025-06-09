import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import generateToken from '../../helpers/jwt';
import { getUserByEmail, insertUser } from '../../repo/userRepo';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, userType } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await insertUser(name, email, hash, userType);

    const token = generateToken(email);

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json({userWithoutPassword, token});
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserByEmail(res.locals.user.email, true);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
