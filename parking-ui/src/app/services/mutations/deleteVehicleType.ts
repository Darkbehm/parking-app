import { gql } from '@apollo/client';

export const DELETE_VEHICLE_TYPE = gql`
  mutation deleteVehicleType($input: DeleteVehicleTypeInput!) {
    deleteVehicleType(input: $input) {
      _id
    }
  }
`;

export interface DeleteVehicleTypeInput {
  _id: string;
  plate: string;
}
