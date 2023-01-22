import { gql } from "@apollo/client";

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
