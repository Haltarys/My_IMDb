import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Film } from '../media/film/film.type';

@ObjectType()
export class Universe {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  wallpaper?: string;

  @Field((type) => [Film])
  films: Film[];
}
