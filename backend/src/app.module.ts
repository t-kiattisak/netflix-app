import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './interfaces/http/movie/movie.module';
import { GenreModule } from './interfaces/http/genre/genre.module';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 60 วินาที
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot(),
    MovieModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
