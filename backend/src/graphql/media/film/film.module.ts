import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './film.entity';
import { Book, BookSchema } from '../book/book.entity';
import { Person, PersonSchema } from 'src/graphql/person/person.entity';
import { Role, RoleSchema } from 'src/graphql/role/role.entity';
import { Universe, UniverseSchema } from 'src/graphql/universe/universe.entity';
import { FilmResolver } from './film.resolver';
import { FilmService } from './film.service';
import { BookService } from '../book/book.service';
import { PersonService } from 'src/graphql/person/person.service';
import { UniverseService } from 'src/graphql/universe/universe.service';
import { RoleService } from 'src/graphql/role/role.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Film.name, schema: FilmSchema },
      { name: Book.name, schema: BookSchema },
      { name: Person.name, schema: PersonSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Universe.name, schema: UniverseSchema },
    ]),
  ],
  providers: [
    FilmResolver,
    FilmService,
    BookService,
    PersonService,
    RoleService,
    UniverseService,
  ],
})
export class FilmModule {}
