import { Field, ID, Int, InterfaceType } from '@nestjs/graphql';
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

  @Field({ nullable: true })
  wikipedia?: string;
}
