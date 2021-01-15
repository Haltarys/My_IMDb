import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Character } from './character.type';

@Resolver((of) => Character)
export class CharacterResolver {
  @ResolveField()
  playedBy(@Parent() character) {
    return [];
  }
}
