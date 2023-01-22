import UserResolver from './user.resolver';
import VehicleResolver from './vehicle.resolver';
import EntryResolver from './entry.resolver';

export const resolvers = [
  UserResolver,
  VehicleResolver,
  EntryResolver,
] as const;
