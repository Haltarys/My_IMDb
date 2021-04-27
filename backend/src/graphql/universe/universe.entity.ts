import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type UniverseDocument = Universe & Document;

@Schema()
export class Universe {
  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  wallpaper?: string;

  @Prop({
    type: [Types.ObjectId],
    required: true,
  })
  films: ObjectId[];
}

export const UniverseSchema = SchemaFactory.createForClass(Universe);
