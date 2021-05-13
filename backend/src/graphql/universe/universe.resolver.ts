import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Universe } from './universe.type';
import { Universe as UniverseEntity } from './universe.entity';
import { Film as FilmEntity } from '../media/film/film.entity';
import { UniverseService } from './universe.service';
import { FilmService } from '../media/film/film.service';

@Resolver((of) => Universe)
export class UniverseResolver {
  constructor(
    private universeService: UniverseService,
    private filmService: FilmService,
  ) {}

  @ResolveField()
  async films(@Parent() universe: UniverseEntity): Promise<FilmEntity[]> {
    return this.filmService.findByMultipleIDs(universe.films);
  }

  @Query((returns) => [Universe])
  async getAllUniverses(): Promise<UniverseEntity[]> {
    return this.universeService.findAll();
  }

  @Query((returns) => Universe, { nullable: true })
  async getUniverseByID(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UniverseEntity> {
    return this.universeService.findByID(id);
  }

  @Query((returns) => Universe, { nullable: true })
  async getUniverseByName(@Args('name') name: string): Promise<UniverseEntity> {
    return this.universeService.findByName(name);
  }

  @Query((returns) => [Universe], { nullable: 'items' })
  async getUniversesWithIDs(
    @Args('ids', { type: () => [ID] }) ids: string[],
  ): Promise<UniverseEntity[]> {
    return this.universeService.findByMultipleIDs(ids);
  }
}
