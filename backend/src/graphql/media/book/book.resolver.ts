import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Book } from './book.type';
import { BookService } from './book.service';
import { PersonService } from 'src/graphql/person/person.service';
import { FilmService } from '../film/film.service';
import { Book as BookEntity } from './book.entity';
import { Person as PersonEntity } from 'src/graphql/person/person.entity';
import { Film as FilmEntity } from '../film/film.entity';

@Resolver((of) => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private personService: PersonService,
    private filmService: FilmService,
  ) {}

  @ResolveField()
  async author(@Parent() book: BookEntity): Promise<PersonEntity> {
    const { author: authorID } = book;

    return authorID ? this.personService.findByID(authorID) : null;
  }

  @ResolveField()
  async adaptations(@Parent() book: BookEntity): Promise<FilmEntity[]> {
    return this.filmService.findByMultipleIDs(book.adaptations);
  }

  @Query((returns) => [Book])
  async getAllBooks(): Promise<BookEntity[]> {
    return this.bookService.findAll();
  }

  @Query((returns) => Book, { nullable: true })
  async getBookByID(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<BookEntity> {
    return this.bookService.findByID(id);
  }

  @Query((returns) => Book, { nullable: true })
  async getBookByTitle(@Args('title') title: string): Promise<BookEntity> {
    return this.bookService.findByTitle(title);
  }

  @Query((returns) => [Book], { nullable: 'items' })
  async getBooksWithIDs(
    @Args('ids', { type: () => [ID] }) ids: string[],
  ): Promise<BookEntity[]> {
    return this.bookService.findByMultipleIDs(ids);
  }
}
