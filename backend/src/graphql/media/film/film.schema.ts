import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
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

  @Prop()
  wikipedia?: string;

  @Prop()
  poster?: string;

  @Prop()
  wallpaper?: string;

  @Prop({
    required: true,
  })
  runningTime: number;

  @Prop()
  basedOnTrueFacts?: boolean;

  @Prop({
    type: Types.ObjectId,
  })
  basedOnBook?: ObjectId;

  @Prop({
    type: [Types.ObjectId],
    required: true,
  })
  directedBy: ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    required: true,
  })
  musicBy: ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    required: true,
  })
  cast: ObjectId[];

  @Prop({
    type: Types.ObjectId,
  })
  previous?: ObjectId;

  @Prop({
    type: Types.ObjectId,
  })
  sequel?: ObjectId;

  @Prop({
    type: Types.ObjectId,
  })
  cinematicUniverse?: ObjectId;

  @Prop({
    required: true,
  })
  trailers: string[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
