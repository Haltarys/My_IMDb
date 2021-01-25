import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Film } from './film.type';
import { IDType } from 'src/graphql/id-type';

@Resolver((of) => Film)
export class FilmResolver {
  @ResolveField()
  basedOnTrueFacts(@Parent() film) {
    return false;
  }

  @ResolveField()
  basedOnBook(@Parent() film) {
    return null;
  }

  @ResolveField()
  directedBy(@Parent() film) {
    return [];
  }

  @ResolveField()
  musicBy(@Parent() film) {
    return [];
  }

  @ResolveField()
  cast(@Parent() film) {
    return [];
  }

  @ResolveField()
  previous(@Parent() film) {
    return null;
  }

  @ResolveField()
  sequel(@Parent() film) {
    return null;
  }

  @ResolveField()
  cinematicUniverse(@Parent() film) {
    return null;
  }

  @Query((returns) => [Film])
  getAllFilms() {
    return [];
  }

  @Query((returns) => Film, { nullable: true })
  getFilmByID(@Args('id', { type: () => ID }) id: IDType) {
    return null;
  }
}
