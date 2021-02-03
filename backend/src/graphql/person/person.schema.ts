import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type PersonDocument = Person & Document;

// "Person" is pluralised to "people" instead of "persons"
// when passed to utils.toCollectionName in mongoose
@Schema()
export class Person {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({ type: [Types.ObjectId] })
  directed: ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  composedFor: ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  playedIn: ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  booksWritten: ObjectId[];
}

export const PersonSchema = SchemaFactory.createForClass(Person);
