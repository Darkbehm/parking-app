import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import * as jf from 'joiful';
import { defaultFields, updateDefaultFields } from './defaultFields.schema';

@ObjectType({ description: 'The entry model' })
export class Entry extends defaultFields {
  @Field(() => String, { description: 'The plate of the vehicle' })
  @prop({ required: true })
  plate: string;

  @Field(() => String, { description: 'The type of the vehicle' })
  @prop({ required: true })
  vehicleType: string;

  @Field(() => String, { description: 'The date and time of the entry' })
  @prop({ required: true, default: () => new Date() })
  entryDate: Date;

  @Field(() => String, { description: 'The date and time of the exit' })
  @prop({ required: false })
  exitDate?: Date;

  @Field(() => Object, {
    description: 'The ammount of time the vehicle was parked',
  })
  @prop({ required: false })
  timeParked?: {
    days: number;
    hours: number;
    minutes: number;
  };

  @Field(() => Number, {
    description: 'The amount of money the vehicle has to pay',
  })
  @prop({ required: false, default: () => 0 })
  amountToPay?: number;
}

export const EntryModel = getModelForClass<typeof Entry>(Entry);

@InputType({ description: 'The entry input' })
export class CreateEntryInput {
  @jf.string().required().min(4).max(10).label('Plate')
  @Field()
  plate: string;

  @jf.string().required().min(4).max(10).label('Vehicle Type')
  @Field()
  vehicleType: string;

  @jf.date().required().label('Entry Date')
  @Field()
  entryDate: Date;

  @jf.date().label('Exit Date')
  @Field()
  exitDate?: Date;
}

@InputType({ description: 'The exit input' })
export class UpdateEntryInput extends updateDefaultFields {
  @jf.string().min(4).max(10).label('Plate')
  @Field()
  plate?: string;

  @jf.string().min(4).max(10).label('Vehicle Type')
  @Field()
  vehicleType?: string;

  @jf.date().label('Exit Date')
  @Field()
  exitDate?: Date;
}
