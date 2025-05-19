import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: [
        'https://netflix-app-git-main-t-kiattisaks-projects.vercel.app',
        'https://netflix-app-self-beta.vercel.app',
      ],
    });
  } else {
    app.enableCors();
  }

  //  HTTP security headers (Content Security Policy, XSS, etc.)
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new ResponseInterceptor(new Reflector()),
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
    }),
  );

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Movie App')
    .setDescription('The Movie API description')
    .setVersion('1.0')
    .addTag('Movie App')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
