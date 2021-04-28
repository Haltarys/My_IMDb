import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Film } from '../media/film/film.type';
import { Role } from '../role/role.type';
import { Book } from '../media/book/book.type';

@ObjectType()
export class Person {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  wikipedia?: string;

  @Field({ nullable: true })
  twitter?: string;

  @Field({ nullable: true })
  portrait?: string;

  @Field((type) => [Film])
  directed: Film[];

  @Field((type) => [Film])
  composedFor: Film[];

  @Field((type) => [Role])
  playedIn: Role[];

  @Field((type) => [Book])
  booksWritten: Book[];
}
