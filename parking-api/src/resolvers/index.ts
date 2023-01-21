import UserResolver from "./user.resolver";
import VehicleResolver from "./vehicle.resolver";

export const resolvers = [UserResolver, VehicleResolver] as const;
