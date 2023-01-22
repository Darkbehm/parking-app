import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateVehicleInput,
  GetVehicleInput,
  UpdateVehicleInput,
  Vehicle,
} from '../schema/vehicle.schema';
import VehicleService from '../service/vehicle.service';

@Resolver()
export default class VehicleResolver {
  constructor(private vehicleService: VehicleService) {
    this.vehicleService = new VehicleService();
  }

  @Authorized()
  @Mutation(() => Vehicle)
  createVehicle(@Arg('input') input: CreateVehicleInput) {
    return this.vehicleService.createVehicle(input);
  }

  @Query(() => [Vehicle])
  vehicles() {
    return this.vehicleService.findVehicles();
  }

  @Query(() => Vehicle)
  vehicle(@Arg('input') input: GetVehicleInput) {
    return this.vehicleService.findSingleVehicle(input);
  }

  @Authorized()
  @Mutation(() => Vehicle)
  updateVehicle(@Arg('input') input: UpdateVehicleInput) {
    return this.vehicleService.updateVehicle(input);
  }

  @Authorized()
  @Mutation(() => Vehicle)
  deleteVehicle(@Arg('vehicleId') vehicleId: string) {
    return this.vehicleService.deleteVehicle(vehicleId);
  }
}
