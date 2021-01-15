import { Field, ID, Int, InterfaceType } from '@nestjs/graphql';
import { Award } from '../award/award.type';
import { IDType } from '../id-type';

@InterfaceType()
export abstract class IMedia {
  @Field((type) => ID)
  id: IDType;

  @Field()
  title: string;

  @Field((type) => Int)
  year: number;

  @Field((type) => [String])
  genres: string[];

  @Field((type) => [Award])
  awards: Award[];
}
