import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Role } from './role.type';
import { RoleService } from './role.service';
import { FilmService } from '../media/film/film.service';
import { CharacterService } from '../character/character.service';
import { PersonService } from '../person/person.service';
import { Role as RoleEntity } from './role.entity';
import { Film as FilmEntity } from '../media/film/film.entity';
import { Person as PersonEntity } from '../person/person.entity';
import { Character as CharacterEntity } from '../character/character.entity';

@Resolver((of) => Role)
export class RoleResolver {
  constructor(
    private roleService: RoleService,
    private filmService: FilmService,
    private characterService: CharacterService,
    private personService: PersonService,
  ) {}

  @ResolveField()
  async film(@Parent() role: RoleEntity): Promise<FilmEntity> {
    return this.filmService.findByID(role.film);
  }

  @ResolveField()
  async character(@Parent() role: RoleEntity): Promise<CharacterEntity> {
    return this.characterService.findByID(role.character);
  }

  @ResolveField()
  playedBy(@Parent() role: RoleEntity): Promise<PersonEntity[]> {
    return this.personService.findByMultipleIDs(role.playedBy);
  }

  @ResolveField()
  async voicedBy(
    @Parent() role: RoleEntity,
    @Args('language', { nullable: true }) language: string,
    @Args('singing', { defaultValue: false }) singing: boolean,
  ): Promise<PersonEntity> {
    return null;
  }

  @Query((returns) => [Role])
  async getAllRoles(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }

  @Query((returns) => Role, { nullable: true })
  async getRoleByID(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<RoleEntity> {
    return this.roleService.findByID(id);
  }

  @Query((returns) => [Role], { nullable: 'items' })
  async getRolesWithIDs(
    @Args('ids', { type: () => [ID] }) ids: string[],
  ): Promise<RoleEntity[]> {
    return this.roleService.findByMultipleIDs(ids);
  }
}
