import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: configService.get("TRUSTED_ORIGINS")?.split(",") ?? ["http://localhost:5173"],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
