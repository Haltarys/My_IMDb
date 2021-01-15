import { Module } from '@nestjs/common';
import { UniverseResolver } from './universe.resolver';

@Module({
  providers: [UniverseResolver],
})
export class UniverseModule {}
