import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Film } from './film.type';
import { Film as MongoFilm } from './film.schema';
import { FilmService } from './film.service';
import { BookService } from '../book/book.service';
import { PersonService } from 'src/graphql/person/person.service';
import { RoleService } from 'src/graphql/role/role.service';
import { UniverseService } from 'src/graphql/universe/universe.service';
import { IDType } from 'src/graphql/id-type';

@Resolver((of) => Film)
export class FilmResolver {
  constructor(
    private filmService: FilmService,
    private bookService: BookService,
    private personService: PersonService,
    private roleService: RoleService,
    private universeService: UniverseService,
  ) {}

  @ResolveField()
  basedOnTrueFacts(@Parent() film: MongoFilm) {
    const { basedOnTrueFacts } = film;

    // return false if null or undefined
    return basedOnTrueFacts || false;
  }

  @ResolveField()
  basedOnBook(@Parent() film: MongoFilm) {
    const { basedOnBook: bookID } = film;

    return bookID ? this.bookService.findBookByID(bookID) : null;
  }

  @ResolveField()
  directedBy(@Parent() film: MongoFilm) {
    const { directedBy: directorIDs } = film;

    return this.personService.findPeopleWithIDs(directorIDs);
  }

  @ResolveField()
  musicBy(@Parent() film: MongoFilm) {
    const { musicBy: musicComposerIDs } = film;

    return this.personService.findPeopleWithIDs(musicComposerIDs);
  }

  @ResolveField()
  cast(@Parent() film: MongoFilm) {
    const { cast: roleIDs } = film;

    return this.roleService.findRolesWithIDs(roleIDs);
  }

  @ResolveField()
  previous(@Parent() film: MongoFilm) {
    const { previous: previousFilmID } = film;

    return previousFilmID
      ? this.filmService.findFilmByID(previousFilmID)
      : null;
  }

  @ResolveField()
  sequel(@Parent() film: MongoFilm) {
    const { sequel: sequelID } = film;

    return sequelID ? this.filmService.findFilmByID(sequelID) : null;
  }

  @ResolveField()
  cinematicUniverse(@Parent() film: MongoFilm) {
    const { cinematicUniverse: universeID } = film;

    return universeID
      ? this.universeService.findUniverseByID(universeID)
      : null;
  }

  @Query((returns) => [Film])
  getAllFilms() {
    return this.filmService.findAllFilms();
  }

  @Query((returns) => Film, { nullable: true })
  getFilmByID(@Args('id', { type: () => ID }) id: IDType) {
    return this.filmService.findFilmByID(id);
  }

  @Query((returns) => Film, { nullable: true })
  getFilmByTitle(@Args('title') title: string) {
    return this.filmService.findFilmByTitle(title);
  }

  @Query((returns) => [Film], { nullable: 'items' })
  getFilmsWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return this.filmService.findFilmsWithIDs(ids);
  }
}
