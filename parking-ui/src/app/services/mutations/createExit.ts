import { gql } from '@apollo/client';

export const CREATE_EXIT = gql`
  mutation createExit($input: UpdateEntryInput!) {
    updateEntry(input: $input) {
      _id
      plate
      timeParked
      vehicleType
      exitDate
      entryDate
      timeParked
      amountToPay
    }
  }
`;

export interface UpdateEntryInput {
  _id: string;
  plate: string;
  exitDate: Date;
}
