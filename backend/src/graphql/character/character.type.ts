import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../role/role.type';

@ObjectType()
export class Character {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => [Role])
  featuredIn: Role[];
}
