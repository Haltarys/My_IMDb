import { Field, ObjectType } from '@nestjs/graphql';
import { IMedia } from '../media.type';
import { Person } from 'src/graphql/person/person.type';
import { Award } from 'src/graphql/award/award.type';
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

  awards: Award[];

  @Field({ nullable: true })
  author?: Person;
}
