import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Person } from './person.type';
import { PersonService } from './person.service';
import { FilmService } from '../media/film/film.service';
import { RoleService } from '../role/role.service';
import { BookService } from '../media/book/book.service';
import { Person as PersonEntity } from './person.entity';
import { Film as FilmEntity } from '../media/film/film.entity';
import { Role as RoleEntity } from '../role/role.entity';
import { Book as BookEntity } from '../media/book/book.entity';

@Resolver((of) => Person)
export class PersonResolver {
  constructor(
    private personService: PersonService,
    private filmService: FilmService,
    private roleService: RoleService,
    private bookService: BookService,
  ) {}

  @ResolveField()
  async directed(@Parent() person: PersonEntity): Promise<FilmEntity[]> {
    return this.filmService.findByMultipleIds(person.directed);
  }

  @ResolveField()
  async composedFor(@Parent() person: PersonEntity): Promise<FilmEntity[]> {
    return this.filmService.findByMultipleIds(person.composedFor);
  }

  @ResolveField()
  async playedIn(@Parent() person: PersonEntity): Promise<RoleEntity[]> {
    return this.roleService.findByMultipleIds(person.playedIn);
  }

  @ResolveField()
  async booksWritten(@Parent() person: PersonEntity): Promise<BookEntity[]> {
    return this.bookService.findByMultipleIds(person.booksWritten);
  }

  @Query((returns) => [Person])
  async getEveryone(): Promise<PersonEntity[]> {
    return this.personService.findAll();
  }

  @Query((returns) => Person, { nullable: true })
  async getPersonById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<PersonEntity> {
    return this.personService.findById(id);
  }

  @Query((returns) => Person, { nullable: true })
  async getPersonByName(@Args('name') name: string): Promise<PersonEntity> {
    return this.personService.findByName(name);
  }

  @Query((returns) => [Person], { nullable: 'items' })
  async getPeopleWithIds(
    @Args('ids', { type: () => [ID] }) ids: string[],
  ): Promise<PersonEntity[]> {
    return this.personService.findByMultipleIds(ids);
  }
}
