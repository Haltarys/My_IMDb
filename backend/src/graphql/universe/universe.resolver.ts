import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Universe } from './universe.type';
import { UniverseService } from './universe.service';
import { FilmService } from '../media/film/film.service';
import { Universe as UniverseEntity } from './universe.entity';
import { Film as FilmEntity } from '../media/film/film.entity';

@Resolver((of) => Universe)
export class UniverseResolver {
  constructor(
    private universeService: UniverseService,
    private filmService: FilmService,
  ) {}

  @ResolveField()
  async films(@Parent() universe: UniverseEntity): Promise<FilmEntity[]> {
    return this.filmService.findByMultipleIds(universe.films);
  }

  @Query((returns) => [Universe])
  async getAllUniverses(): Promise<UniverseEntity[]> {
    return this.universeService.findAll();
  }

  @Query((returns) => Universe, { nullable: true })
  async getUniverseById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UniverseEntity> {
    return this.universeService.findById(id);
  }

  @Query((returns) => Universe, { nullable: true })
  async getUniverseByName(@Args('name') name: string): Promise<UniverseEntity> {
    return this.universeService.findByName(name);
  }

  @Query((returns) => [Universe], { nullable: 'items' })
  async getUniversesWithIds(
    @Args('ids', { type: () => [ID] }) ids: string[],
  ): Promise<UniverseEntity[]> {
    return this.universeService.findByMultipleIds(ids);
  }
}
