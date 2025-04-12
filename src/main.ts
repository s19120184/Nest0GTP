import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //para verificar y validar cada uno de los endpoint
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  )

  //abilitar corrs
  app.enableCors()

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
