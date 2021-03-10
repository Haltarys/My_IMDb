import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IMedia } from '../media.type';
import { Book } from '../book/book.type';
import { Person } from 'src/graphql/person/person.type';
import { Universe } from 'src/graphql/universe/universe.type';
import { Role } from 'src/graphql/role/role.type';
import { IDType } from 'src/graphql/id-type';

@ObjectType({
  // Can also return an array of types if it implements
  // multiple interfaces
  implements: () => IMedia,
})
export class Film implements IMedia {
  id: IDType;

  title: string;

  year: number;

  genres: string[];

  wikipedia?: string;

  @Field({ nullable: true })
  tagline?: string;

  @Field({ nullable: true })
  poster?: string;

  @Field({ nullable: true })
  wallpaper?: string;

  @Field((type) => Int)
  runningTime: number;

  @Field()
  basedOnTrueFacts: boolean;

  @Field((type) => Book, { nullable: true })
  basedOnBook?: Book;

  @Field((type) => [Person])
  directedBy: Person[];

  @Field((type) => [Person])
  musicBy: Person[];

  @Field((type) => [Role])
  cast: Role[];

  @Field((type) => Film, { nullable: true })
  previous?: Film;

  @Field((type) => Film, { nullable: true })
  sequel?: Film;

  @Field((type) => Universe, { nullable: true })
  cinematicUniverse?: Universe;

  @Field((type) => [String])
  trailers: string[];
}
