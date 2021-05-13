import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Person, PersonSchema } from 'src/graphql/person/person.entity';
import { Film, FilmSchema } from 'src/graphql/media/film/film.entity';
import { Universe, UniverseSchema } from 'src/graphql/universe/universe.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Person.name, schema: PersonSchema },
      { name: Film.name, schema: FilmSchema },
      { name: Universe.name, schema: UniverseSchema },
    ]),
    MulterModule.register({ dest: 'uploads' }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
