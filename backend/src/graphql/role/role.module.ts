import { Module } from '@nestjs/common';
import { IRoleResolver } from './role.resolver';
import { ActorRoleModule } from './actor-role/actor-role.module';
import { FilmRoleModule } from './film-role/film-role.module';

@Module({
  imports: [ActorRoleModule, FilmRoleModule],
  providers: [IRoleResolver],
})
export class RoleModule {}
