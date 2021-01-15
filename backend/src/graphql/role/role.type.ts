import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Character } from '../character/character.type';
import { Person } from '../person/person.type';
import { IDType } from '../id-type';

@InterfaceType()
export abstract class IRole {
  @Field((type) => ID)
  id: IDType;

  @Field()
  character: Character;

  @Field((type) => Person, { nullable: true })
  voicedBy?: Person;
}
