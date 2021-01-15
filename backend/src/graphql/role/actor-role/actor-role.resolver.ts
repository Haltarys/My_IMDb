import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ActorRole } from './actor-role.type';

@Resolver((of) => ActorRole)
export class ActorRoleResolver {
  @ResolveField()
  film(@Parent() role) {
    return null;
  }
}
