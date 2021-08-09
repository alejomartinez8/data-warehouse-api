import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

// const whitelist = [
//   'http://localhost:3000',
//   'https://data-warehouse-am.herokuapp.com',
//   'https://data-warehouse-app.vercel.app',
// ];

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: false,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
