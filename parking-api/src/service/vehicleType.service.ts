import {
  VehicleTypeModel,
  CreateVehicleTypeInput,
  GetVehicleTypePriceInput,
  UpdateVehicleTypeInput,
  DeleteVehicleTypeInput,
} from '../schema/vehicleTypes.schema';
import { GraphQLError } from 'graphql';

class VehicleTypeService {
  async createVehicleType(input: CreateVehicleTypeInput) {
    return await VehicleTypeModel.create(input);
  }

  async getVehicleTypePrice(input: GetVehicleTypePriceInput) {
    const vehicle = await VehicleTypeModel.findById(input._id);
    if (!vehicle) {
      throw new GraphQLError('Vehicle Type not found', {
        extensions: {
          code: 'VEHICLE_TYPE_NOT_FOUND',
        },
      });
    }
    return vehicle.price;
  }

  async updateVehicleType(input: UpdateVehicleTypeInput) {
    return await VehicleTypeModel.findByIdAndUpdate(input._id, input, {
      new: true,
    });
  }

  async deleteVehicleType(input: DeleteVehicleTypeInput) {
    return await VehicleTypeModel.findByIdAndDelete(input._id);
  }

  async getVehicleTypes() {
    return await VehicleTypeModel.find();
  }
}

export default VehicleTypeService;
