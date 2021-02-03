import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  film: ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  character: ObjectId;

  @Prop({
    type: [Types.ObjectId],
    required: true,
  })
  playedBy: ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    required: true,
  })
  voicedBy: ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
