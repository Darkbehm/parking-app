import { gql } from '@apollo/client';

export const EDIT_VEHICLE = gql`
  mutation updateVehicle($input: UpdateVehicleInput!) {
    updateVehicle(input: $input) {
      plate
      vehicleType
    }
  }
`;
