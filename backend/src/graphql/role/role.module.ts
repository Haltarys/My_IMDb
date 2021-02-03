import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './role.schema';
import { Film, FilmSchema } from '../media/film/film.schema';
import { Character, CharacterSchema } from '../character/character.schema';
import { Person, PersonSchema } from '../person/person.schema';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { FilmService } from '../media/film/film.service';
import { CharacterService } from '../character/character.service';
import { PersonService } from '../person/person.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Film.name, schema: FilmSchema },
      { name: Character.name, schema: CharacterSchema },
      { name: Person.name, schema: PersonSchema },
    ]),
  ],
  providers: [
    RoleResolver,
    RoleService,
    FilmService,
    CharacterService,
    PersonService,
  ],
})
export class RoleModule {}
