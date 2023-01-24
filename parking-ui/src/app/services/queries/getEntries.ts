import { gql } from '@apollo/client';

export const GET_ENTRIES = gql`
  query entries {
    entries {
      _id
      createdAt
      updatedAt
      plate
      vehicleType
      timeParked
      amountToPay
      entryDate
      exitDate
    }
  }
`;

export interface getEntriesResponseItem {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  plate: string;
  vehicleType: string;
  timeParked: number;
  amountToPay: number;
  entryDate: string;
  exitDate: string;
}

export interface getEntriesResponse {
  entries: getEntriesResponseItem[];
}
