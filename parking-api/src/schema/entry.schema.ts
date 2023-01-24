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

  @Field(() => String, {
    description: 'The date and time of the exit',
    nullable: true,
  })
  @prop()
  exitDate?: Date;

  @Field(() => Number, {
    description: 'The ammount of time the vehicle was parked,in minutes',
    nullable: true,
  })
  @prop({ required: false, default: () => 0 })
  timeParked?: number;

  @Field(() => Number, {
    description: 'The amount of money the vehicle has to pay',
    nullable: true,
  })
  @prop({ required: false })
  amountToPay?: number;
}

export const EntryModel = getModelForClass<typeof Entry>(Entry);

@InputType({ description: 'The entry input' })
export class CreateEntryInput {
  @jf.string().min(8).max(8).label('Plate')
  @Field()
  plate: string;

  @jf.date().required().label('Entry Date')
  @Field()
  entryDate: Date;
}

@InputType({ description: 'get the last entry input by plate' })
export class GetEntryInput {
  @jf.string().min(8).max(8).label('Plate')
  @Field()
  plate: string;
}

@InputType({ description: 'The exit input' })
export class UpdateEntryInput extends updateDefaultFields {
  @jf.string().min(8).max(8).label('Plate')
  @Field()
  plate: string;

  @jf.date().label('Exit Date')
  @Field()
  exitDate?: Date;
}
