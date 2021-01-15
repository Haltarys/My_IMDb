import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { IRole } from './role.type';

@Resolver((of) => IRole)
export class IRoleResolver {
  @ResolveField()
  character(@Parent() role) {
    return null;
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
