import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilmRole } from '../role/film-role/film-role.type';
import { IDType } from '../id-type';

@ObjectType()
export class Character {
  @Field((type) => ID)
  id: IDType;

  @Field()
  name: string;

  @Field((type) => [FilmRole])
  playedBy: FilmRole[];
}
