import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Role } from './role.type';
import { IDType } from '../id-type';

@Resolver((of) => Role)
export class RoleResolver {
  @ResolveField()
  film(@Parent() role) {
    return null;
  }

  @ResolveField()
  character(@Parent() role) {
    return null;
  }

  @ResolveField()
  playedBy(@Parent() role) {
    return [];
  }

  @ResolveField()
  voicedBy(
    @Parent() role,
    @Args('language', { nullable: true }) language: string,
    @Args('singing', { defaultValue: false }) singing: boolean,
  ) {
    return null;
  }

  @Query((returns) => [Role])
  getAllRoles() {
    return [];
  }

  @Query((returns) => Role, { nullable: true })
  getRoleByID(@Args('id', { type: () => ID }) id: IDType) {
    return null;
  }

  @Query((returns) => [Role], { nullable: 'items' })
  getRolesWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return [];
  }
}
