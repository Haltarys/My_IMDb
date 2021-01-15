import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { PersonModule } from './person/person.module';
import { UniverseModule } from './universe/universe.module';
import { RoleModule } from './role/role.module';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    MediaModule,
    PersonModule,
    UniverseModule,
    RoleModule,
    CharacterModule,
  ],
})
export class MyImdbModule {}
