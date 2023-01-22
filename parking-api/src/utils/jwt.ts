import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserContext } from '../schema/user.schema';
dotenv.config();

const secret = process.env.JWT_SECRET;

export function signJwt(object: UserContext) {
  return jwt.sign(object, secret);
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, secret) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
