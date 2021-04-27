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
import { IDType } from '../id-type';

@Resolver((of) => Role)
export class RoleResolver {
  constructor(
    private roleService: RoleService,
    private filmService: FilmService,
    private characterService: CharacterService,
    private personService: PersonService,
  ) {}

  @ResolveField()
  film(@Parent() role: RoleEntity) {
    const { film: filmID } = role;

    return this.filmService.findFilmByID(filmID);
  }

  @ResolveField()
  character(@Parent() role: RoleEntity) {
    const { character: characterID } = role;

    return this.characterService.findCharacterByID(characterID);
  }

  @ResolveField()
  playedBy(@Parent() role: RoleEntity) {
    const { playedBy: actorIDs } = role;

    return this.personService.findPeopleWithIDs(actorIDs);
  }

  @ResolveField()
  voicedBy(
    @Parent() role,
    @Args('language', { nullable: true }) language: string,
    @Args('singing', { defaultValue: false }) singing: boolean,
  ) {
    return null;
  }

  @Query((returns) => [Role])
  getAllRoles() {
    return this.roleService.findAllRoles();
  }

  @Query((returns) => Role, { nullable: true })
  getRoleByID(@Args('id', { type: () => ID }) id: IDType) {
    return this.roleService.findRoleByID(id);
  }

  @Query((returns) => [Role], { nullable: 'items' })
  getRolesWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return this.roleService.findRolesWithIDs(ids);
  }
}
