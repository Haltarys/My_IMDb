import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Person } from './person.type';
import { IDType } from '../id-type';

@Resolver((of) => Person)
export class PersonResolver {
  @ResolveField()
  directed(@Parent() person) {
    return [];
  }

  @ResolveField()
  composedFor(@Parent() person) {
    return [];
  }

  @ResolveField()
  playedIn(@Parent() person) {
    return [];
  }

  @ResolveField()
  booksWritten(@Parent() person) {
    return [];
  }

  @Query((returns) => [Person])
  getEveryone() {
    return [];
  }

  @Query((returns) => Person, { nullable: true })
  getPersonByID(@Args('id', { type: () => ID }) id: IDType) {
    return null;
  }

  @Query((returns) => Person, { nullable: true })
  getPersonByName(@Args('name') name: string) {
    return null;
  }

  @Query((returns) => [Person], { nullable: 'items' })
  getPeopleWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return [];
  }
}
