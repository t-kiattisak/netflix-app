import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './interfaces/http/movie/movie.module';
import { GenreModule } from './interfaces/http/genre/genre.module';

@Module({
  imports: [ConfigModule.forRoot(), MovieModule, GenreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
