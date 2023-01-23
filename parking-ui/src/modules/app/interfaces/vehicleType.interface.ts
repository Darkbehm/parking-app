import { defaultFields } from "modules/app/interfaces";

export interface VehicleType extends defaultFields {
  type: string;
  price: number;
  description: string;
}
