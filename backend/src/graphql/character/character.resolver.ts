import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Character } from './character.type';
import { Character as MongoCharacter } from './character.schema';
import { CharacterService } from './character.service';
import { RoleService } from '../role/role.service';
import { IDType } from '../id-type';

@Resolver((of) => Character)
export class CharacterResolver {
  constructor(
    private characterService: CharacterService,
    private roleService: RoleService,
  ) {}

  @ResolveField()
  featuredIn(@Parent() character: MongoCharacter) {
    const { featuredIn: roleIDs } = character;

    return this.roleService.findRolesWithIDs(roleIDs);
  }

  @Query((returns) => [Character])
  getAllCharacters() {
    return this.characterService.findAllCharacters();
  }

  @Query((returns) => Character, { nullable: true })
  getCharacterByID(@Args('id', { type: () => ID }) id: IDType) {
    return this.characterService.findCharacterByID(id);
  }

  @Query((returns) => Character, { nullable: true })
  getCharacterByName(@Args('name') name: string) {
    return this.characterService.findCharacterByName(name);
  }

  @Query((returns) => [Character], { nullable: 'items' })
  getCharactersWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return this.characterService.findCharactersWithIDs(ids);
  }
}
