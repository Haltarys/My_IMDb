import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Character } from './character.type';
import { CharacterService } from './character.service';
import { RoleService } from '../role/role.service';
import { Character as CharacterEntity } from './character.entity';
import { Role as RoleEntity } from '../role/role.entity';

@Resolver((of) => Character)
export class CharacterResolver {
  constructor(
    private characterService: CharacterService,
    private roleService: RoleService,
  ) {}

  @ResolveField()
  async featuredIn(
    @Parent() character: CharacterEntity,
  ): Promise<RoleEntity[]> {
    return this.roleService.findByMultipleIds(character.featuredIn);
  }

  @Query((returns) => [Character])
  async getAllCharacters(): Promise<CharacterEntity[]> {
    return this.characterService.findAll();
  }

  @Query((returns) => Character, { nullable: true })
  async getCharacterById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CharacterEntity> {
    return this.characterService.findById(id);
  }

  @Query((returns) => Character, { nullable: true })
  async getCharacterByName(
    @Args('name') name: string,
  ): Promise<CharacterEntity> {
    return this.characterService.findByName(name);
  }

  @Query((returns) => [Character], { nullable: 'items' })
  async getCharactersWithIds(
    @Args('ids', { type: () => [ID] }) ids: string[],
  ): Promise<CharacterEntity[]> {
    return this.characterService.findByMultipleIds(ids);
  }
}
