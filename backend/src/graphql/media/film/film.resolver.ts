import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Film } from './film.type';
import { FilmService } from './film.service';
import { BookService } from '../book/book.service';
import { PersonService } from 'src/graphql/person/person.service';
import { RoleService } from 'src/graphql/role/role.service';
import { UniverseService } from 'src/graphql/universe/universe.service';
import { Film as FilmEntity } from './film.entity';
import { Book as BookEntity } from '../book/book.entity';
import { Person as PersonEntity } from 'src/graphql/person/person.entity';
import { Role as RoleEntity } from 'src/graphql/role/role.entity';
import { Universe as UniverseEntity } from 'src/graphql/universe/universe.entity';

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
  async basedOnTrueFacts(@Parent() film: FilmEntity): Promise<boolean> {
    // return false if null or undefined
    return film.basedOnTrueFacts || false;
  }

  @ResolveField()
  async basedOnBook(@Parent() film: FilmEntity): Promise<BookEntity> {
    const { basedOnBook: bookID } = film;

    return bookID ? this.bookService.findByID(bookID) : null;
  }

  @ResolveField()
  async directedBy(@Parent() film: FilmEntity): Promise<PersonEntity[]> {
    const { directedBy: directorIDs } = film;

    return this.personService.findByMultipleIDs(directorIDs);
  }

  @ResolveField()
  async musicBy(@Parent() film: FilmEntity): Promise<PersonEntity[]> {
    const { musicBy: musicComposerIDs } = film;

    return this.personService.findByMultipleIDs(musicComposerIDs);
  }

  @ResolveField()
  cast(@Parent() film: FilmEntity): Promise<RoleEntity[]> {
    const { cast: roleIDs } = film;

    return this.roleService.findByMultipleIDs(roleIDs);
  }

  @ResolveField()
  async previous(@Parent() film: FilmEntity): Promise<FilmEntity> {
    const { previous: previousFilmID } = film;

    return previousFilmID ? this.filmService.findByID(previousFilmID) : null;
  }

  @ResolveField()
  async sequel(@Parent() film: FilmEntity): Promise<FilmEntity> {
    const { sequel: sequelID } = film;

    return sequelID ? this.filmService.findByID(sequelID) : null;
  }

  @ResolveField()
  async cinematicUniverse(@Parent() film: FilmEntity): Promise<UniverseEntity> {
    const { cinematicUniverse: universeID } = film;

    return universeID ? this.universeService.findByID(universeID) : null;
  }

  @Query((returns) => [Film])
  getAllFilms(): Promise<FilmEntity[]> {
    return this.filmService.findAll();
  }

  @Query((returns) => Film, { nullable: true })
  getFilmByID(@Args('id', { type: () => ID }) id: string): Promise<FilmEntity> {
    return this.filmService.findByID(id);
  }

  @Query((returns) => Film, { nullable: true })
  getFilmByTitle(@Args('title') title: string): Promise<FilmEntity> {
    return this.filmService.findByTitle(title);
  }

  @Query((returns) => [Film], { nullable: 'items' })
  getFilmsWithIDs(
    @Args('ids', { type: () => [ID] }) ids: string[],
  ): Promise<FilmEntity[]> {
    return this.filmService.findByMultipleIDs(ids);
  }
}
