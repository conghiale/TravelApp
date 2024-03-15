import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const bcryptHash = async (password: string) => {
  if (!password) return '';
  return await bcrypt.hash(password, 12);
};

export const bcryptCompare = async (password, hashedPassword) => {
  if (!hashedPassword || !password) return '';
  return await bcrypt.compare(password, hashedPassword);
};

export const parseObjectId = (id: string) => {
  return new mongoose.Types.ObjectId(id);
};
