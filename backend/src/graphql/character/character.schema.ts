import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    type: [Types.ObjectId],
    required: true,
  })
  featuredIn: ObjectId[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
