import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Role } from './role.type';
import { Role as RoleEntity } from './role.entity';
import { RoleService } from './role.service';
import { FilmService } from '../media/film/film.service';
import { CharacterService } from '../character/character.service';
import { PersonService } from '../person/person.service';

@Resolver((of) => Role)
export class RoleResolver {
  constructor(
    private roleService: RoleService,
    private filmService: FilmService,
    private characterService: CharacterService,
    private personService: PersonService,
  ) {}

  @ResolveField()
  async film(@Parent() role: RoleEntity) {
    const { film: filmID } = role;

    return this.filmService.findByID(filmID);
  }

  @ResolveField()
  async character(@Parent() role: RoleEntity) {
    const { character: characterID } = role;

    return this.characterService.findByID(characterID);
  }

  @ResolveField()
  playedBy(@Parent() role: RoleEntity) {
    const { playedBy: actorIDs } = role;

    return this.personService.findByMultipleIDs(actorIDs);
  }

  @ResolveField()
  async voicedBy(
    @Parent() role,
    @Args('language', { nullable: true }) language: string,
    @Args('singing', { defaultValue: false }) singing: boolean,
  ) {
    return null;
  }

  @Query((returns) => [Role])
  async getAllRoles() {
    return this.roleService.findAll();
  }

  @Query((returns) => Role, { nullable: true })
  async getRoleByID(@Args('id', { type: () => ID }) id: string) {
    return this.roleService.findByID(id);
  }

  @Query((returns) => [Role], { nullable: 'items' })
  async getRolesWithIDs(@Args('ids', { type: () => [ID] }) ids: string[]) {
    return this.roleService.findByMultipleIDs(ids);
  }
}
