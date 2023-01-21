import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import * as jf from "joiful";
import { defaultFields, updateDefaultFields } from "./defaultFields.schema";

@ObjectType()
@index({ type: 1 })
export class VehicleType extends defaultFields {
  @Field(() => String,
    { description: "The type of the registed vehicle, must be unique" })
  @prop({ required: true })
  type: string;

  @Field(() => Number, { description: "The $value/min the vehicle have to pay" })
  @prop({ required: true, default: () => 0.0 })
  price: number;

  @Field(() => String, { description: "The description of the vehicle type" })
  @prop({ required: true })
  description: string;
}

export const VehicleTypeModel =
  getModelForClass<typeof VehicleType>(VehicleType);

@InputType()
export class CreateVehicleTypeInput {
  @jf.string().required().min(4).max(10).label("Type")
  @Field()
  type: string;

  @jf.number().required().min(0).max(100).label("Price")
  @Field()
  price: number;

  @jf.string().required().min(16).max(256).label("Description")
  @Field()
  description: string;
}

@InputType()
export class GetVehicleTypePriceInput {
  @jf
    .string()
    .required()
    .regex(/^[0-9a-fA-F]{24}/)
    .label("id")
  @Field()
  _id?: string;
}

@InputType()
export class UpdateVehicleTypeInput extends updateDefaultFields {
  @jf.string().min(4).max(10).label("Type")
  @Field()
  type?: string;

  @jf.number().min(0).max(100).label("Price")
  @Field()
  price?: number;

  @jf.string().min(16).max(256).label("Description")
  @Field()
  description?: string;
}
