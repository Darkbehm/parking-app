import { defaultFields } from "modules/app/interfaces";

export interface Vehicle extends defaultFields {
  plate: string;

  //mongoose.Types.ObjectId format
  vehicleType: string;
}
