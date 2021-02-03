import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  year: number;

  @Prop({
    required: true,
  })
  genres: string[];

  @Prop({
    type: Types.ObjectId,
  })
  author?: ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
