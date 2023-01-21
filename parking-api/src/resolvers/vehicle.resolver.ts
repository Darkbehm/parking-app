import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateVehicleInput,
  GetVehicleInput,
  UpdateVehicleInput,
  Vehicle,
} from "../schema/vehicle.schema";
import VehicleService from "../service/vehicle.service";
import Context from "../types/context";

@Resolver()
export default class VehicleResolver {
  constructor(private vehicleService: VehicleService) {
    this.vehicleService = new VehicleService();
  }

  @Authorized()
  @Mutation(() => Vehicle)
  createVehicle(
    @Arg("input") input: CreateVehicleInput,
    @Ctx() context: Context
  ) {
    return this.vehicleService.createVehicle(input);
  }

  @Query(() => [Vehicle])
  vehicles() {
    return this.vehicleService.findVehicles();
  }

  @Query(() => Vehicle)
  vehicle(@Arg("input") input: GetVehicleInput) {
    return this.vehicleService.findSingleVehicle(input);
  }

  @Authorized()
  @Mutation(() => Vehicle)
  updateVehicle(
    @Arg("input") input: UpdateVehicleInput,
    @Ctx() context: Context
  ) {
    return this.vehicleService.updateVehicle(input);
  }
}
