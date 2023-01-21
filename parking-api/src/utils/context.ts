import { UserContext } from '../schema/user.schema';
import Context from '../types/context';
import { verifyJwt } from './jwt';

const context = async (ctx: Context) => {
  const { req } = ctx;
  if (req.cookies.accessToken && req.cookies.accessToken !== 'null') {
    const user = verifyJwt<UserContext>(req.cookies.accessToken);
    ctx.user = user;
  }
  return ctx;
};

export default context;
