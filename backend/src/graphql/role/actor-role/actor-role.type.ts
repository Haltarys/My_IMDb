import { Field, ObjectType } from '@nestjs/graphql';
import { IRole } from '../role.type';
import { Character } from 'src/graphql/character/character.type';
import { Person } from 'src/graphql/person/person.type';
import { Film } from 'src/graphql/media/film/film.type';
import { IDType } from 'src/graphql/id-type';

@ObjectType({
  // Can also return an array of types if it implements
  // multiple interfaces
  implements: () => IRole,
})
export class ActorRole implements IRole {
  id: IDType;

  character: Character;

  voicedBy?: Person;

  @Field((type) => Film)
  film: Film;
}
