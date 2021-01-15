import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Film } from '../media/film/film.type';
import { ActorRole } from '../role/actor-role/actor-role.type';
import { IDType } from '../id-type';

@ObjectType()
export class Person {
  @Field((type) => ID)
  id: IDType;

  @Field()
  name: string;

  @Field((type) => [Film])
  directed: Film[];

  @Field((type) => [Film])
  composedFor: Film[];

  @Field((type) => [ActorRole])
  playedIn: ActorRole[];
}
