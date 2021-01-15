import { Field, ObjectType } from '@nestjs/graphql';
import { IMedia } from '../media.type';
import { Book } from '../book/book.type';
import { Award } from 'src/graphql/award/award.type';
import { Person } from 'src/graphql/person/person.type';
import { Universe } from 'src/graphql/universe/universe.type';
import { FilmRole } from 'src/graphql/role/film-role/film-role.type';
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

  awards: Award[];

  @Field()
  basedOnTrueFacts: boolean;

  @Field((type) => Book, { nullable: true })
  basedOnBook?: Book;

  @Field((type) => [Person])
  directedBy: Person[];

  @Field((type) => [Person])
  musicBy: Person[];

  @Field((type) => [FilmRole])
  cast: FilmRole[];

  @Field((type) => Film, { nullable: true })
  sequel?: Film;

  @Field((type) => Film, { nullable: true })
  previous?: Film;

  @Field((type) => Universe, { nullable: true })
  cinematicUniverse?: Universe;
}
