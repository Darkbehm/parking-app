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
    const vehicles = await VehicleModel.find({
      isActive: true,
    })
      .populate('vehicleType')
      .lean();

    return vehicles;
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
    const updated = await VehicleModel.findOneAndUpdate(
      { _id: input._id },
      newVehicle,
      {
        new: true,
      },
    ).lean();

    return updated;
  }

  async findVehicleType(vehicleTypeId: string) {
    const type = await VehicleTypeModel.findOne({
      _id: vehicleTypeId,
      isActive: true,
    }).lean();

    return type?.type || 'normal';
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
