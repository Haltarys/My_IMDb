import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Universe, UniverseSchema } from './universe.schema';
import { Film, FilmSchema } from '../media/film/film.schema';
import { UniverseResolver } from './universe.resolver';
import { UniverseService } from './universe.service';
import { FilmService } from '../media/film/film.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Universe.name, schema: UniverseSchema },
      { name: Film.name, schema: FilmSchema },
    ]),
  ],
  providers: [UniverseResolver, UniverseService, FilmService],
})
export class UniverseModule {}
