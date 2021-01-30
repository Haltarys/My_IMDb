import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Role } from './role.type';

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
}
