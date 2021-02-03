import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { Person, PersonSchema } from 'src/graphql/person/person.schema';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { PersonService } from 'src/graphql/person/person.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Person.name, schema: PersonSchema },
    ]),
  ],
  providers: [BookResolver, BookService, PersonService],
})
export class BookModule {}
