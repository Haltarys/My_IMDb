import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { MyImdbModule } from './graphql/my-imdb.module';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.generated.gql'),
      sortSchema: false,
    }),
    MyImdbModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
