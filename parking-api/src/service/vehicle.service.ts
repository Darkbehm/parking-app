import {
  VehicleModel,
  CreateVehicleInput,
  GetVehicleInput,
  UpdateVehicleInput,
} from '../schema/vehicle.schema';

import { VehicleTypeModel } from '../schema/vehicleTypes.schema';
import { GraphQLError } from 'graphql';

class VehicleService {
  async createVehicle(input: CreateVehicleInput) {
    return VehicleModel.create(input);
  }

  async findVehicles() {
    return VehicleModel.find({
      isActive: true,
    }).lean();
  }

  async findSingleVehicle(input: GetVehicleInput) {
    return VehicleModel.findOne({
      ...input,
      isActive: true,
    }).lean();
  }

  async updateVehicle(input: UpdateVehicleInput) {
    const newVehicle = {
      ...input,
      updatedAt: new Date(),
    };
    return VehicleModel.findOneAndUpdate(newVehicle, newVehicle, {
      new: true,
    }).lean();
  }

  async findVehicleType(vehicleTypeId: string) {
    return (
      VehicleTypeModel.findOne({ _id: vehicleTypeId, isActive: true }).lean()
        ?.name || 'default'
    );
  }

  async deleteVehicle(vehicleId: string) {
    const vehicle = await VehicleModel.findOne({ _id: vehicleId }).lean();
    if (!vehicle) {
      throw new GraphQLError('Vehicle not found', {
        extensions: {
          code: 'VEHICLE_NOT_FOUND',
        },
      });
    }
    const deletedVehicle = {
      ...vehicle,
      updatedAt: new Date(),
      isActive: false,
    };
    return VehicleModel.findOneAndUpdate({ _id: vehicleId }, deletedVehicle, {
      new: true,
    }).lean();
  }
}

export default VehicleService;
