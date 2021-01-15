import { Module } from '@nestjs/common';
import { FilmRoleResolver } from './film-role.resolver';

@Module({
  providers: [FilmRoleResolver],
})
export class FilmRoleModule {}
