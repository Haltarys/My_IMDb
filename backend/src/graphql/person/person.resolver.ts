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
    return this.filmService.findByMultipleIDs(person.directed);
  }

  @ResolveField()
  async composedFor(@Parent() person: PersonEntity) {
    return this.filmService.findByMultipleIDs(person.composedFor);
  }

  @ResolveField()
  async playedIn(@Parent() person: PersonEntity) {
    return this.roleService.findByMultipleIDs(person.playedIn);
  }

  @ResolveField()
  async booksWritten(@Parent() person: PersonEntity) {
    return this.bookService.findByMultipleIDs(person.booksWritten);
  }

  @Query((returns) => [Person])
  async getEveryone() {
    return this.personService.findAll();
  }

  @Query((returns) => Person, { nullable: true })
  async getPersonByID(@Args('id', { type: () => ID }) id: string) {
    return this.personService.findByID(id);
  }

  @Query((returns) => Person, { nullable: true })
  async getPersonByName(@Args('name') name: string) {
    return this.personService.findByName(name);
  }

  @Query((returns) => [Person], { nullable: 'items' })
  async getPeopleWithIDs(@Args('ids', { type: () => [ID] }) ids: string[]) {
    return this.personService.findByMultipleIDs(ids);
  }
}
