import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.use(
//     cookieSession({
//       keys: ['random_key_temp'],
//     }),
//   );
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//     }),
//   );
//   app.useGlobalFilters(new HttpExceptionFilter());
//   await app.listen(process.env.PORT ?? 3000);
// }
