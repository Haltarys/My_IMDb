import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Film } from './film.type';
import { Film as FilmEntity } from './film.entity';
import { FilmService } from './film.service';
import { BookService } from '../book/book.service';
import { PersonService } from 'src/graphql/person/person.service';
import { RoleService } from 'src/graphql/role/role.service';
import { UniverseService } from 'src/graphql/universe/universe.service';

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
  async basedOnTrueFacts(@Parent() film: FilmEntity) {
    // return false if null or undefined
    return film.basedOnTrueFacts || false;
  }

  @ResolveField()
  async basedOnBook(@Parent() film: FilmEntity) {
    const { basedOnBook: bookID } = film;

    return bookID ? this.bookService.findByID(bookID) : null;
  }

  @ResolveField()
  async directedBy(@Parent() film: FilmEntity) {
    const { directedBy: directorIDs } = film;

    return this.personService.findByMultipleIDs(directorIDs);
  }

  @ResolveField()
  async musicBy(@Parent() film: FilmEntity) {
    const { musicBy: musicComposerIDs } = film;

    return this.personService.findByMultipleIDs(musicComposerIDs);
  }

  @ResolveField()
  cast(@Parent() film: FilmEntity) {
    const { cast: roleIDs } = film;

    return this.roleService.findByMultipleIDs(roleIDs);
  }

  @ResolveField()
  async previous(@Parent() film: FilmEntity) {
    const { previous: previousFilmID } = film;

    return previousFilmID ? this.filmService.findByID(previousFilmID) : null;
  }

  @ResolveField()
  async sequel(@Parent() film: FilmEntity) {
    const { sequel: sequelID } = film;

    return sequelID ? this.filmService.findByID(sequelID) : null;
  }

  @ResolveField()
  async cinematicUniverse(@Parent() film: FilmEntity) {
    const { cinematicUniverse: universeID } = film;

    return universeID ? this.universeService.findByID(universeID) : null;
  }

  @Query((returns) => [Film])
  getAllFilms() {
    return this.filmService.findAll();
  }

  @Query((returns) => Film, { nullable: true })
  getFilmByID(@Args('id', { type: () => ID }) id: string) {
    return this.filmService.findByID(id);
  }

  @Query((returns) => Film, { nullable: true })
  getFilmByTitle(@Args('title') title: string) {
    return this.filmService.findByTitle(title);
  }

  @Query((returns) => [Film], { nullable: 'items' })
  getFilmsWithIDs(@Args('ids', { type: () => [ID] }) ids: string[]) {
    return this.filmService.findByMultipleIDs(ids);
  }
}
