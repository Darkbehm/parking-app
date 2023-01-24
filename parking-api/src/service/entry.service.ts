import { GraphQLError } from 'graphql';
import {
  CreateEntryInput,
  Entry,
  EntryModel,
  GetEntryInput,
  UpdateEntryInput,
} from '../schema/Entry.schema';
import VehicleService from './vehicle.service';

import { VehicleTypeModel } from '../schema/vehicleTypes.schema';

class EntryService {
  async createEntry(input: CreateEntryInput) {
    const vehicleService = new VehicleService();
    const { plate } = input;
    const vehicleTypeId = (await vehicleService.findSingleVehicle({ plate }))
      ?.vehicleType;

    const vehicleType = vehicleTypeId
      ? await vehicleService.findVehicleType(vehicleTypeId.toString())
      : 'normal';

    const newEntry = {
      ...input,
      vehicleType,
      createdAt: new Date(),
      timeParked: 0,
    };

    return EntryModel.create(newEntry);
  }

  async findEntries() {
    const entries = (
      await EntryModel.find({
        isActive: true,
      }).lean()
    )?.map((entry) => {
      const { _id, ...rest } = entry;
      return {
        _id: _id.toString(),
        ...rest,
      };
    });
    return entries;
  }

  async findLastEntry({ plate }: GetEntryInput) {
    return await EntryModel.findOne({ plate }).sort({ createdAt: -1 }).lean();
  }

  async updateEntry({ _id, plate, exitDate }: UpdateEntryInput) {
    const actualEntry = await EntryModel.findOne({ _id, plate }).lean();
    if (!actualEntry) {
      throw new GraphQLError('No entry found', {
        extensions: {
          code: 'NO_ENTRY_FOUND',
        },
      });
    }

    const { timeParked, amountToPay } = await getTimeAndAmountToPay(
      exitDate,
      actualEntry,
    );

    const newEntry: Entry = {
      ...actualEntry,
      updatedAt: new Date(),
      exitDate: exitDate ? exitDate : new Date(),
      timeParked,
      amountToPay,
    };

    return EntryModel.findOneAndUpdate({ _id }, newEntry, {
      new: true,
    }).lean();
  }

  async deleteEntry(_id: string) {
    const entry = await EntryModel.findOne({ _id, isActive: true }).lean();
    if (!entry) {
      throw new GraphQLError('Entry not found', {
        extensions: {
          code: 'ENTRY_NOT_FOUND',
        },
      });
    }
    const deletedEntry = {
      ...entry,
      updatedAt: new Date(),
      isActive: false,
    };
    return EntryModel.findOneAndUpdate
      .bind(EntryModel)({ _id }, deletedEntry, { new: true })
      .lean();
  }
}

export default EntryService;

async function getTimeAndAmountToPay(exitDate: Date, actualEntry) {
  const exit = (exitDate ? exitDate : new Date()).getTime();
  const entry = actualEntry.entryDate.getTime();
  const timeParked = Math.trunc((exit - entry) / 1000 / 60);

  const vehicleType = await VehicleTypeModel.findOne({
    type: actualEntry.vehicleType,
  }).lean();

  if (!vehicleType) {
    throw new GraphQLError('No vehicle type found', {
      extensions: {
        code: 'NO_VEHICLE_TYPE_FOUND',
      },
    });
  }

  const amountToPay = Math.floor(timeParked * vehicleType.price);

  return { timeParked, amountToPay };
}
