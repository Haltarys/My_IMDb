import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Film } from '../media/film/film.type';
import { Role } from '../role/role.type';
import { Book } from '../media/book/book.type';
import { IDType } from '../id-type';

@ObjectType()
export class Person {
  @Field((type) => ID)
  id: IDType;

  @Field()
  name: string;

  @Field((type) => [Film])
  directed: Film[];

  @Field((type) => [Film])
  composedFor: Film[];

  @Field((type) => [Role])
  playedIn: Role[];

  @Field((type) => [Book])
  booksWritten: Book[];
}
