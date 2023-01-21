import {
  getModelForClass,
  prop,
  pre,
  ReturnModelType,
  queryMethod,
  index,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import bcrypt from "bcrypt";
import { Field, InputType, ObjectType } from "type-graphql";
import * as jf from "joiful";
import { defaultFields } from "./defaultFields.schema";

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User["email"]
) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>("save", async function () {
  // Check that the password is being modified
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User extends defaultFields {
  @Field(() => String, {
    description: "The name of the user",
  })
  @prop({ required: true })
  name: string;

  @Field(() => String,{
    description: "The email of the user",
  })
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @Field()
  @prop({ required: true, default: () => false })
  isAdmin: boolean;
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

@InputType()
export class CreateUserInput {
  @jf.string().required().min(5).max(128).label("Name")
  @Field(() => String)
  name: string;

  @jf.string().email().required().label("Email")
  @Field(() => String)
  email: string;

  @jf
    .string()
    .required()
    .min(8)
    .max(32)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .label("Password")
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @jf.string().email().required().label("Email")
  @Field(() => String)
  email: string;

  @jf.string().required().min(8).max(32)
  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateUserInput {
  @jf.string().required().min(5).max(128).label("Name")
  @Field(() => String)
  name: string;

  @jf.string().email().required().label("Email")
  @Field(() => String)
  email: string;

  @jf.string().required().min(8).max(32).label("Password")
  @Field(() => String)
  password: string;

  @jf.boolean().required().label("Is Active")
  @Field(() => Boolean)
  isActive: boolean;

  @jf.boolean().label("Is Admin")
  @Field(() => Boolean)
  isAdmin?: boolean;
}
