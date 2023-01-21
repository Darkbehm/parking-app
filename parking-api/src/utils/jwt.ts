import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
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
