import { User } from '../dao/user';

export const getUserByEmail = async (email: string, removePassword?: boolean) => {
  return await User.findOne({ where: { email }, attributes: removePassword ? { exclude: ['password'] } : undefined });
}

export const insertUser = async (name: string, email: string, password: string, userType: string) => {
  const user = await User.create({
    name,
    email,
    password,
    userType,
  });
  return user;
}