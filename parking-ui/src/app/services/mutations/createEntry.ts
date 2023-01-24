import { gql } from '@apollo/client';

export const CREATE_ENTRY = gql`
  mutation createEntry($input: CreateEntryInput!) {
    createEntry(input: $input) {
      _id
      plate
      timeParked
    }
  }
`;

export interface CreateEntryInput {
  plate: string;
  entryDate: Date;
}
