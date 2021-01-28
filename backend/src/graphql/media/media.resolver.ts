import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { IMedia } from './media.type';

@Resolver((of) => IMedia)
export class IMediaResolver {
  @ResolveField()
  genres(@Parent() media) {
    return [];
  }
}
