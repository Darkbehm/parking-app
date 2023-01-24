import { gql } from '@apollo/client';

export const DELETE_VEHICLE = gql`
  mutation deleteVehicle($id: String!) {
    deleteVehicle(vehicleId: $id) {
      _id
    }
  }
`;
