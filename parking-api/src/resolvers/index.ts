import UserResolver from './user.resolver';
import VehicleResolver from './vehicle.resolver';
import EntryResolver from './entry.resolver';
import VehicleTypeResolver from './vehicleType.resolver';

export const resolvers = [
  UserResolver,
  VehicleResolver,
  EntryResolver,
  VehicleTypeResolver,
] as const;
