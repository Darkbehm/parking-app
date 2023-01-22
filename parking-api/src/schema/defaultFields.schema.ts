import { prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import * as jf from 'joiful';
@ObjectType({
  isAbstract: true,
})
export class defaultFields {
  @Field(() => String, {
    description: 'The id of the item',
  })
  _id: string;

  @Field({
    description: 'The date the item was created',
  })
  @prop({ required: true, default: () => new Date() })
  createdAt: Date;

  @Field({
    description: 'The date the item was last updated',
  })
  @prop({ required: true, default: () => new Date() })
  updatedAt: Date;

  @Field({
    description: 'if the item is active or not',
  })
  @prop({ required: true, default: () => true })
  isActive: boolean;
}

@InputType()
export class updateDefaultFields {
  @jf
    .string()
    .regex(/^[0-9a-fA-F]{24}/)
    .label('_id')
    .required()
  @Field()
  _id: string;
}

@InputType({
  description: 'The input for deleting an item',
})
export class deleteDefaultFields {
  @jf
    .string()
    .regex(/^[0-9a-fA-F]{24}/)
    .label('_id')
    .required()
  @Field()
  _id: string;
}
