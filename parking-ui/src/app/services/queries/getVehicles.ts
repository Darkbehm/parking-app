import { gql } from '@apollo/client';

export const GET_VEHICLES = gql`
  query vehicles {
    vehicles {
      _id
      plate
      vehicleType {
        _id
        type
        description
      }
    }
  }
`;

export interface getVehiclesResponseItem {
  _id: string;
  plate: string;
  vehicleType: {
    _id: string;
    type: string;
    description: string;
  };
}

export interface getVehiclesResponse {
  vehicles: getVehiclesResponseItem[];
}
