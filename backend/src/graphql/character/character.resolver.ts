import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Character } from './character.type';
import { IDType } from '../id-type';

@Resolver((of) => Character)
export class CharacterResolver {
  @ResolveField()
  featuredIn(@Parent() character) {
    return [];
  }

  @Query((returns) => [Character])
  getAllCharacters() {
    return [];
  }

  @Query((returns) => Character, { nullable: true })
  getCharacterByID(@Args('id', { type: () => ID }) id: IDType) {
    return null;
  }

  @Query((returns) => Character, { nullable: true })
  getCharacterByName(@Args('name') name: string) {
    return null;
  }

  @Query((returns) => [Character], { nullable: 'items' })
  getCharactersWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return [];
  }
}
