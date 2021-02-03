import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './person.schema';
import { Film, FilmSchema } from '../media/film/film.schema';
import { Role, RoleSchema } from '../role/role.schema';
import { Book, BookSchema } from '../media/book/book.schema';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';
import { FilmService } from '../media/film/film.service';
import { RoleService } from '../role/role.service';
import { BookService } from '../media/book/book.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Person.name, schema: PersonSchema },
      { name: Film.name, schema: FilmSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  providers: [
    PersonResolver,
    PersonService,
    FilmService,
    RoleService,
    BookService,
  ],
})
export class PersonModule {}
