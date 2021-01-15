import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IDType } from '../id-type';

@ObjectType()
export class Award {
  @Field((type) => ID)
  id: IDType;

  @Field()
  title: string;
}
