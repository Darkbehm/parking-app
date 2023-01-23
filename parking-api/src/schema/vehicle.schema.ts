import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import * as jf from 'joiful';
import { VehicleType } from './vehicleTypes.schema';
import {
  defaultFields,
  deleteDefaultFields,
  updateDefaultFields,
} from './defaultFields.schema';

@ObjectType({ description: 'Vehicle model' })
@index({ plate: 1 }, { unique: true })
export class Vehicle extends defaultFields {
  @Field(() => String, {
    description: 'The plate of the vehicle, must be unique',
  })
  @prop({ required: true, unique: true })
  plate: string;

  @Field(() => String, {
    description:
      'The ID of the type, you can check the types available with the query getTypes',
  })
  @prop({ required: true, ref: () => VehicleType })
  vehicleType: Ref<VehicleType>;
}
export const VehicleModel = getModelForClass<typeof Vehicle>(Vehicle);

@InputType()
export class CreateVehicleInput {
  @jf.string().required().min(4).max(10).label('Plate')
  @Field()
  plate: string;

  //validate if type is a mongoose id
  @jf
    .string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .label('vehicleType')
  @Field()
  vehicleType: string;
}

@InputType()
export class GetVehicleInput {
  @jf.string().min(4).max(10).label('Plate')
  @Field()
  plate?: string;

  //validate if type is a mongoose id
  @jf
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .label('id')
  @Field()
  _id?: string;
}

@InputType()
export class UpdateVehicleInput extends updateDefaultFields {
  @jf.string().min(4).max(10).required().label('Plate')
  @Field()
  plate: string;

  //validate if type is a mongoose id
  @jf
    .string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .label('vehicleType')
  @Field()
  vehicleType: string;
}

@InputType({
  description: 'The input for deleting a vehicle',
})
export class DeleteVehicleInput extends deleteDefaultFields {
  @jf.string().min(4).max(10).label('Plate')
  @Field()
  plate?: string;
}

@ObjectType()
export class VehicleQueryResponse {
  @Field()
  _id: string;

  @Field()
  plate: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => VehicleType)
  vehicleType: VehicleType;

  @Field()
  isActive: boolean;
}
