import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Universe, UniverseSchema } from './universe.entity';
import { Film, FilmSchema } from '../media/film/film.entity';
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
