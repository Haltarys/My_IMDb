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
import { UniverseService } from './universe.service';
import { FilmService } from '../media/film/film.service';

@Resolver((of) => Universe)
export class UniverseResolver {
  constructor(
    private universeService: UniverseService,
    private filmService: FilmService,
  ) {}

  @ResolveField()
  async films(@Parent() universe: UniverseEntity) {
    const { films: filmIDs } = universe;

    return this.filmService.findByMultipleIDs(filmIDs);
  }

  @Query((returns) => [Universe])
  async getAllUniverses() {
    return this.universeService.findAll();
  }

  @Query((returns) => Universe, { nullable: true })
  async getUniverseByID(@Args('id', { type: () => ID }) id: string) {
    return this.universeService.findByID(id);
  }

  @Query((returns) => Universe, { nullable: true })
  async getUniverseByName(@Args('name') name: string) {
    return this.universeService.findByName(name);
  }

  @Query((returns) => [Universe], { nullable: 'items' })
  async getUniversesWithIDs(@Args('ids', { type: () => [ID] }) ids: string[]) {
    return this.universeService.findByMultipleIDs(ids);
  }
}
