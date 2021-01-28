import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../role/role.type';
import { IDType } from '../id-type';

@ObjectType()
export class Character {
  @Field((type) => ID)
  id: IDType;

  @Field()
  name: string;

  @Field((type) => [Role])
  featuredIn: Role[];
}
