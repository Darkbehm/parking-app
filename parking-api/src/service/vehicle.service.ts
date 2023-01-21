import {
  VehicleModel,
  CreateVehicleInput,
  GetVehicleInput,
  UpdateVehicleInput,
} from '../schema/vehicle.schema';

class VehicleService {
  async createVehicle(input: CreateVehicleInput) {
    return VehicleModel.create(input);
  }

  async findVehicles() {
    return VehicleModel.find().lean();
  }

  async findSingleVehicle(input: GetVehicleInput) {
    return VehicleModel.findOne(input).lean();
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
}

export default VehicleService;
