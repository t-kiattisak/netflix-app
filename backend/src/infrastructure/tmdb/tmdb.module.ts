import { Module } from '@nestjs/common';
import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TmdbMovieRepositoryImpl } from './tmdb.movie.repository.impl';
import { TmdbMovieRepository } from './tmdb.movie.repository';
import { MovieRepository } from '@/domain/repositories/movie.repository';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): HttpModuleOptions => ({
        baseURL: config.get<string>('TMDB_BASE_URL'),
        headers: {
          Authorization: `Bearer ${config.get<string>('TMDB_ACCESS_TOKEN')}`,
        },
      }),
    }),
  ],
  providers: [
    TmdbMovieRepositoryImpl,
    TmdbMovieRepository,
    {
      provide: MovieRepository,
      useExisting: TmdbMovieRepository,
    },
  ],
  exports: [MovieRepository],
})
export class TmdbModule {}
