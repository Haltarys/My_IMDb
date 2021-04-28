import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Person } from './person.type';
import { Person as PersonEntity } from './person.entity';
import { PersonService } from './person.service';
import { FilmService } from '../media/film/film.service';
import { IDType } from '../id-type';
import { RoleService } from '../role/role.service';
import { BookService } from '../media/book/book.service';

@Resolver((of) => Person)
export class PersonResolver {
  constructor(
    private personService: PersonService,
    private filmService: FilmService,
    private roleService: RoleService,
    private bookService: BookService,
  ) {}

  @ResolveField()
  async directed(@Parent() person: PersonEntity) {
    const { directed: filmIDs } = person;

    return this.filmService.findFilmsWithIDs(filmIDs);
  }

  @ResolveField()
  async composedFor(@Parent() person: PersonEntity) {
    const { composedFor: filmIDs } = person;

    return this.filmService.findFilmsWithIDs(filmIDs);
  }

  @ResolveField()
  async playedIn(@Parent() person: PersonEntity) {
    const { playedIn: roleIDs } = person;

    return this.roleService.findRolesWithIDs(roleIDs);
  }

  @ResolveField()
  async booksWritten(@Parent() person: PersonEntity) {
    const { booksWritten: bookIDs } = person;

    return this.bookService.findBooksWithIDs(bookIDs);
  }

  @Query((returns) => [Person])
  async getEveryone() {
    return this.personService.findEveryone();
  }

  @Query((returns) => Person, { nullable: true })
  async getPersonByID(@Args('id', { type: () => ID }) id: IDType) {
    return this.personService.findPersonByID(id);
  }

  @Query((returns) => Person, { nullable: true })
  async getPersonByName(@Args('name') name: string) {
    return this.personService.findPersonByName(name);
  }

  @Query((returns) => [Person], { nullable: 'items' })
  async getPeopleWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return this.personService.findPeopleWithIDs(ids);
  }
}
