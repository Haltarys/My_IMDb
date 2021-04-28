import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Film } from '../media/film/film.type';
import { Character } from '../character/character.type';
import { Person } from '../person/person.type';

@ObjectType()
export class Role {
  @Field((type) => ID)
  id: string;

  @Field((type) => Film)
  film: Film;

  @Field({ nullable: true })
  roleName?: string;

  @Field((type) => Character)
  character: Character;

  @Field((type) => [Person])
  playedBy: Person[];

  @Field((type) => Person, { nullable: true })
  voicedBy?: Person;
}
