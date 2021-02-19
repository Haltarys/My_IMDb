import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { Person, PersonSchema } from 'src/graphql/person/person.schema';
import { Film, FilmSchema } from '../film/film.schema';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { PersonService } from 'src/graphql/person/person.service';
import { FilmService } from '../film/film.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Person.name, schema: PersonSchema },
      { name: Film.name, schema: FilmSchema },
    ]),
  ],
  providers: [BookResolver, BookService, PersonService, FilmService],
})
export class BookModule {}
