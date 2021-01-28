import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Film } from '../media/film/film.type';
import { Character } from '../character/character.type';
import { Person } from '../person/person.type';
import { IDType } from '../id-type';

@ObjectType()
export class Role {
  @Field((type) => ID)
  id: IDType;

  @Field((type) => Film)
  film: Film;

  @Field((type) => Character)
  character: Character;

  @Field((type) => Person, { nullable: true })
  playedBy?: Person;

  @Field((type) => Person, { nullable: true })
  voicedBy?: Person;
}
