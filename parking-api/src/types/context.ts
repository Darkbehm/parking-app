import { Request, Response } from 'express';
import { UserContext } from '../schema/user.schema';

interface Context {
  req: Request;
  res: Response;
  user: UserContext | null;
}

export default Context;
