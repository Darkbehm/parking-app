import { gql } from "@apollo/client";

export const GET_VEHICLES = gql`
  query vehicles {
    vehicles {
      _id
      plate
      vehicleType
    }
  }
`;

