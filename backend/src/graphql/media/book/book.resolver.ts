import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Book } from './book.type';
import { IDType } from 'src/graphql/id-type';

@Resolver((of) => Book)
export class BookResolver {
  @Query((returns) => [Book])
  getAllBooks() {
    return [];
  }

  @Query((returns) => Book, { nullable: true })
  getBookByID(@Args('id', { type: () => ID }) id: IDType) {
    return null;
  }

  @Query((returns) => [Book], { nullable: 'items' })
  getBooksWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return [];
  }
}
