import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { FilmRole } from './film-role.type';

@Resolver((of) => FilmRole)
export class FilmRoleResolver {
  @ResolveField()
  playedBy(@Parent() role) {
    return null;
  }
}
