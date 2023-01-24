import { gql } from '@apollo/client';

export const DELETE_ENTRY = gql`
  mutation deleteVehicle($id: String!) {
    deleteEntry(entryId: $id) {
      _id
      plate
    }
  }
`;
