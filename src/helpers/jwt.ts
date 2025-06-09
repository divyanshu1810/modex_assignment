import * as JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'some-default-secret';

export default function generateToken(email: string): string {
  return JWT.sign({ email }, jwtSecret, { expiresIn: '1d', algorithm: 'HS256' } as JWT.SignOptions);
}

export function verifyToken(token: string): { email: string } {
  const data = JWT.verify(token, jwtSecret) as string;

  return data as unknown as { email: string };
}