import { Field, ObjectType } from '@nestjs/graphql';
import { IRole } from '../role.type';
import { Character } from 'src/graphql/character/character.type';
import { Person } from 'src/graphql/person/person.type';
import { IDType } from 'src/graphql/id-type';

@ObjectType({
  // Can also return an array of types if it implements
  // multiple interfaces
  implements: () => IRole,
})
export class FilmRole implements IRole {
  id: IDType;

  character: Character;

  voicedBy?: Person;

  @Field((type) => Person, { nullable: true })
  playedBy?: Person;
}
