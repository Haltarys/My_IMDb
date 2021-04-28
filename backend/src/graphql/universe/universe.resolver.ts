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
import { IDType } from '../id-type';

@Resolver((of) => Universe)
export class UniverseResolver {
  constructor(
    private universeService: UniverseService,
    private filmService: FilmService,
  ) {}

  @ResolveField()
  async films(@Parent() universe: UniverseEntity) {
    const { films: filmIDs } = universe;

    return this.filmService.findFilmsWithIDs(filmIDs);
  }

  @Query((returns) => [Universe])
  async getAllUniverses() {
    return this.universeService.findAllUniverses();
  }

  @Query((returns) => Universe, { nullable: true })
  async getUniverseByID(@Args('id', { type: () => ID }) id: IDType) {
    return this.universeService.findUniverseByID(id);
  }

  @Query((returns) => Universe, { nullable: true })
  async getUniverseByName(@Args('name') name: string) {
    return this.universeService.findUniverseByName(name);
  }

  @Query((returns) => [Universe], { nullable: 'items' })
  async getUniversesWithIDs(@Args('ids', { type: () => [ID] }) ids: IDType[]) {
    return this.universeService.findUniversesWithIDs(ids);
  }
}
