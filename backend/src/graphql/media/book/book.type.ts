import { Field, ObjectType } from '@nestjs/graphql';
import { IMedia } from '../media.type';
import { Person } from 'src/graphql/person/person.type';
import { Film } from '../film/film.type';
import { IDType } from 'src/graphql/id-type';

@ObjectType({
  // Can also return an array of types if it implements
  // multiple interfaces
  implements: () => IMedia,
})
export class Book implements IMedia {
  id: IDType;

  title: string;

  year: number;

  genres: string[];

  @Field({ nullable: true })
  cover?: string;

  @Field({ nullable: true })
  author?: Person;

  @Field((type) => [Film])
  adaptations: Film[];
}
