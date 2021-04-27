import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './character.entity';
import { Role, RoleSchema } from '../role/role.entity';
import { CharacterResolver } from './character.resolver';
import { RoleService } from '../role/role.service';
import { CharacterService } from './character.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [CharacterResolver, CharacterService, RoleService],
})
export class CharacterModule {}
