import { Module } from '@nestjs/common';
import { ActorRoleResolver } from './actor-role.resolver';

@Module({
  providers: [ActorRoleResolver],
})
export class ActorRoleModule {}
