import { GraphQLError } from 'graphql';
import { AuthChecker } from 'type-graphql';
import Context from '../types/context';

const authChecker: AuthChecker<Context> = ({ context }, roles) => {
  const { user } = context;

  if (!user) {
    throw new GraphQLError('Not logged in', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }

  if (roles.length === 0) {
    return true;
  }

  if (roles.includes(user.role)) {
    return true;
  }
  return false;
};

export default authChecker;
