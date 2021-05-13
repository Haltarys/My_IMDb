import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import {
  DB_URL,
  DB_NAME,
  DB_ADMIN_USER,
  DB_ADMIN_PASSWORD,
} from './config/config';
import { MyImdbModule } from './graphql/my-imdb.module';
import { ImageModule } from './image/image.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    MongooseModule.forRoot(DB_URL, {
      dbName: DB_NAME,
      auth: {
        user: DB_ADMIN_USER,
        password: DB_ADMIN_PASSWORD,
      },
      retryWrites: true,
      w: 'majority',
    }),
    MyImdbModule,
    ImageModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
