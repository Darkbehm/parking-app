import { Arg, Authorized, Mutation, Query } from 'type-graphql';
import {
  VehicleType,
  CreateVehicleTypeInput,
  UpdateVehicleTypeInput,
} from '../schema/vehicleTypes.schema';
import VehicleTypeService from '../service/vehicleType.service';
import { DeleteVehicleTypeInput } from '../schema/vehicleTypes.schema';

export default class VehicleTypeResolver {
  constructor(private vehicleTypeService: VehicleTypeService) {
    this.vehicleTypeService = new VehicleTypeService();
  }

  @Query(() => [VehicleType])
  vehicleTypes() {
    return this.vehicleTypeService.getVehicleTypes();
  }

  @Authorized(['ADMIN'])
  @Mutation(() => VehicleType)
  createVehicleType(@Arg('input') input: CreateVehicleTypeInput) {
    return this.vehicleTypeService.createVehicleType(input);
  }

  @Authorized(['ADMIN'])
  @Mutation(() => VehicleType)
  updateVehicleType(@Arg('input') input: UpdateVehicleTypeInput) {
    return this.vehicleTypeService.updateVehicleType(input);
  }

  @Authorized(['ADMIN'])
  @Mutation(() => VehicleType)
  deleteVehicleType(@Arg('input') input: DeleteVehicleTypeInput) {
    return this.vehicleTypeService.deleteVehicleType(input);
  }
}
