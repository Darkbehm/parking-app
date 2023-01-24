import { gql } from '@apollo/client';

export const IS_ADMIN = gql`
  query isAdmin {
    me {
      _id
      name
      isAdmin
    }
  }
`;
