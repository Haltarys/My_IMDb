import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { MyImdbModule } from './graphql/my-imdb.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import {
  DB_URL,
  DB_NAME,
  DB_ADMIN_USER,
  DB_ADMIN_PASSWORD,
} from './config/config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.generated.gql'),
      sortSchema: false,
    }),
    MyImdbModule,
    MongooseModule.forRoot(DB_URL, {
      dbName: DB_NAME,
      auth: {
        user: DB_ADMIN_USER,
        password: DB_ADMIN_PASSWORD,
      },
      retryWrites: true,
      w: 'majority',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
