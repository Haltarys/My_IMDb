import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Universe } from './universe.type';
import { IDType } from '../id-type';

@Resolver((of) => Universe)
export class UniverseResolver {
  @ResolveField()
  films(@Parent() universe) {
    return [];
  }

  @Query((returns) => [Universe])
  getAllUniverses() {
    return [];
  }

  @Query((returns) => Universe, { nullable: true })
  getUniverseByID(@Args('id', { type: () => ID }) id: IDType) {
    return null;
  }

  @Query((returns) => [Universe], { nullable: 'items' })
  getUniversesWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return [];
  }
}
