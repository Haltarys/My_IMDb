import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Character } from './character.type';
import { Character as CharacterEntity } from './character.entity';
import { CharacterService } from './character.service';
import { RoleService } from '../role/role.service';

@Resolver((of) => Character)
export class CharacterResolver {
  constructor(
    private characterService: CharacterService,
    private roleService: RoleService,
  ) {}

  @ResolveField()
  async featuredIn(@Parent() character: CharacterEntity) {
    const { featuredIn: roleIDs } = character;

    return this.roleService.findRolesWithIDs(roleIDs);
  }

  @Query((returns) => [Character])
  async getAllCharacters() {
    return this.characterService.findAllCharacters();
  }

  @Query((returns) => Character, { nullable: true })
  async getCharacterByID(@Args('id', { type: () => ID }) id: string) {
    return this.characterService.findCharacterByID(id);
  }

  @Query((returns) => Character, { nullable: true })
  async getCharacterByName(@Args('name') name: string) {
    return this.characterService.findCharacterByName(name);
  }

  @Query((returns) => [Character], { nullable: 'items' })
  async getCharactersWithIDs(@Args('ids', { type: () => [ID] }) ids: string[]) {
    return this.characterService.findCharactersWithIDs(ids);
  }
}
