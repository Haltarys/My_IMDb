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

  basedOnBook(@Parent() film) {
    return null;
  }

  directedBy(@Parent() film) {
    return [];
  }

  musicBy(@Parent() film) {
    return [];
  }

  cast(@Parent() film) {
    return [];
  }

  sequel(@Parent() film) {
    return null;
  }

  previous(@Parent() film) {
    return null;
  }

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
