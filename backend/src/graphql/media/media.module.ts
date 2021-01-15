import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { FilmModule } from './film/film.module';
import { IMediaResolver } from './media.resolver';

@Module({
  imports: [BookModule, FilmModule],
  providers: [IMediaResolver],
})
export class MediaModule {}
