import { Module } from '@nestjs/common';
import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { TmdbMovieRepository } from './tmdb.movie.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  providers: [TmdbMovieRepository],
  exports: [TmdbMovieRepository, HttpModule],
})
export class TmdbModule {}
