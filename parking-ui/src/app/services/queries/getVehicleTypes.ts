import { gql } from '@apollo/client';

export const GET_VEHICLES_TYPES = gql`
  query getVehicleTypes {
    vehicleTypes {
      _id
      type
      price
      description
    }
  }
`;

export interface getVehicleTypesResponseItem {
  _id: string;
  type: string;
  price: number;
  description: string;
}

export interface getVehicleTypesResponse {
  vehicleTypes: getVehicleTypesResponseItem[];
}
