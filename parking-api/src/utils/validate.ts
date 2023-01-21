import { GraphQLError } from 'graphql';
import * as jf from 'joiful';

const validate = (argValue: unknown) => {
  const { error } = jf.validate(argValue);
  if (error) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'BAD_USER_INPUT',
        inputField: error.details[0].path[0],
      },
    });
  }
};

export default validate;
