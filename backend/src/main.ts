import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
};

bootstrap();
