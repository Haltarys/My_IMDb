import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Book } from './book.type';
import { Book as BookEntity } from './book.entity';
import { BookService } from './book.service';
import { PersonService } from 'src/graphql/person/person.service';
import { FilmService } from '../film/film.service';
import { IDType } from 'src/graphql/id-type';

@Resolver((of) => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private personService: PersonService,
    private filmService: FilmService,
  ) {}

  @ResolveField()
  author(@Parent() book: BookEntity) {
    const { author: authorID } = book;

    return authorID ? this.personService.findPersonByID(authorID) : null;
  }

  @ResolveField()
  adaptations(@Parent() book: BookEntity) {
    const { adaptations: filmIDs } = book;

    return this.filmService.findFilmsWithIDs(filmIDs);
  }

  @Query((returns) => [Book])
  getAllBooks() {
    return this.bookService.findAllBooks();
  }

  @Query((returns) => Book, { nullable: true })
  getBookByID(@Args('id', { type: () => ID }) id: IDType) {
    return this.bookService.findBookByID(id);
  }

  @Query((returns) => Book, { nullable: true })
  getBookByTitle(@Args('title') title: string) {
    return this.bookService.findBookByTitle(title);
  }

  @Query((returns) => [Book], { nullable: 'items' })
  getBooksWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return this.bookService.findBooksWithIDs(ids);
  }
}
