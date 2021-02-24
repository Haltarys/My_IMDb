import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Film } from '../media/film/film.type';
import { IDType } from '../id-type';

@ObjectType()
export class Universe {
  @Field((type) => ID)
  id: IDType;

  @Field()
  name: string;

  @Field({ nullable: true })
  wallpaper?: string;

  @Field((type) => [Film])
  films: Film[];
}
