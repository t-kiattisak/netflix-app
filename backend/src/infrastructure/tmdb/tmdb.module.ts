import { Module } from '@nestjs/common';
import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TmdbMovieRepositoryImpl } from './tmdb.movie.repository.impl';
import { TmdbMovieRepository } from './tmdb.movie.repository';
import { MovieRepository } from '@/domain/repositories/movie.repository';
import { TmdbGenreRepository } from './tmdb.genre.repository';
import { TmdbGenreRepositoryImpl } from './tmdb.genre.repository.impl';
import { GenreRepository } from '@/domain/repositories/genre.repository';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): HttpModuleOptions => {
        const baseURL = config.get<string>('TMDB_BASE_URL');
        const token = config.get<string>('TMDB_ACCESS_TOKEN');

        console.log('TMDB_BASE_URL:', baseURL);
        console.log('TMDB_ACCESS_TOKEN:', token?.slice(0, 10) + '...');

        return {
          baseURL: baseURL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  ],
  // MovieRepository (interface)
  //     ↑
  // useExisting → TmdbMovieRepository (class)
  //                     ↑
  //           inject → TmdbMovieRepositoryImpl
  providers: [
    TmdbMovieRepositoryImpl,
    TmdbMovieRepository,
    {
      provide: MovieRepository,
      useExisting: TmdbMovieRepository,
    },
    TmdbGenreRepositoryImpl,
    TmdbGenreRepository, // สร้าง instance จริง
    {
      provide: GenreRepository, // token ที่ use-case ใช้เรียก
      useExisting: TmdbGenreRepository, // ให้ใช้ instance เดิมที่สร้างไปแล้ว
    },
  ],
  exports: [MovieRepository, GenreRepository],
})
export class TmdbModule {}
