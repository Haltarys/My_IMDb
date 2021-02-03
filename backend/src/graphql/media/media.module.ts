import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { FilmModule } from './film/film.module';

@Module({
  imports: [BookModule, FilmModule],
})
export class MediaModule {}
